// Tiny persisted store shared by the header, profile page and settings page.
// Edit your name or photo in Settings and every screen updates at once.
//
// TODO(backend): when the API is ready, load these from GET /me and GET /me/settings,
// and turn `updateProfile` / `updateSettings` into PATCH calls (see lib/api.js).
import { useSyncExternalStore } from "react";
import { api } from "./api";
import { PROFILE } from "../pages/profile/data/profileData";
import { DEFAULT_SETTINGS } from "../pages/settings/data/settingsData";

const isObject = (v) => v && typeof v === "object" && !Array.isArray(v);

// Merge saved values over defaults, one nested level deep, so newly added
// settings keys still get their default instead of `undefined`.
function merge(defaults, saved) {
  if (!isObject(saved)) return defaults;
  const out = { ...defaults };
  for (const key of Object.keys(defaults)) {
    if (!(key in saved)) continue;
    out[key] = isObject(defaults[key]) ? { ...defaults[key], ...(isObject(saved[key]) ? saved[key] : {}) } : saved[key];
  }
  return out;
}

function createStore(storageKey, defaults) {
  const listeners = new Set();

  const load = () => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? merge(defaults, JSON.parse(raw)) : defaults;
    } catch {
      return defaults;
    }
  };

  let state = load();

  const commit = (next) => {
    state = next;
    try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch { /* storage full or blocked: keep in memory */ }
    listeners.forEach((l) => l());
  };

  return {
    get: () => state,
    subscribe: (l) => { listeners.add(l); return () => listeners.delete(l); },
    update: (patch) => commit({ ...state, ...(typeof patch === "function" ? patch(state) : patch) }),
    reset: () => commit(defaults),
  };
}

const profileStore = createStore("devsphere_profile", PROFILE);
const settingsStore = createStore("devsphere_settings", DEFAULT_SETTINGS);

export function useProfile() {
  const profile = useSyncExternalStore(profileStore.subscribe, profileStore.get);
  return [profile, profileStore.update];
}

export function useSettings() {
  const settings = useSyncExternalStore(settingsStore.subscribe, settingsStore.get);
  return [settings, settingsStore.update];
}

/** Wipes saved profile + settings and signs out (used by "Delete account"). */
export function resetUserData() {
  profileStore.reset();
  settingsStore.reset();
  try { localStorage.removeItem("devsphere_token"); } catch { /* ignore */ }
}

// ---------------------------------------------------------------------------
// Backend sync. With no login token the app keeps working from localStorage
// (offline / demo mode); with a token every change is also saved on the server.
// ---------------------------------------------------------------------------
const hasToken = () => {
  try { return !!localStorage.getItem("devsphere_token"); } catch { return false; }
};

// Server-only fields the local store doesn't track
const stripServerOnly = ({ id, ...rest }) => rest; // eslint-disable-line no-unused-vars

/** Loads profile + settings from GET /api/me. Silent no-op when signed out or offline. */
export async function hydrateFromServer() {
  if (!hasToken()) return false;
  try {
    const { profile, settings } = await api.get("/me");
    profileStore.update({ ...PROFILE, ...stripServerOnly(profile) });
    settingsStore.update(settings);
    return true;
  } catch {
    return false;
  }
}

/** PATCH /me. Throws ApiError (e.g. "username taken") so the form can show it. */
export async function saveProfile(values) {
  if (!hasToken()) { profileStore.update(values); return; }
  const { profile } = await api.patch("/me", values);
  profileStore.update({ ...PROFILE, ...stripServerOnly(profile) });
}

/** Optimistic settings save. Resolves true/false instead of throwing. */
export async function saveSettings(patch) {
  const previous = settingsStore.get();
  settingsStore.update(patch);
  if (!hasToken()) return true;
  try {
    await api.patch("/me/settings", patch);
    return true;
  } catch {
    settingsStore.update(previous); // roll back so the UI never lies
    return false;
  }
}

export async function saveAvatar(dataUrl) {
  if (hasToken()) await api.put("/me/avatar", { avatar: dataUrl });
  profileStore.update({ avatar: dataUrl });
}

export async function clearAvatar() {
  if (hasToken()) await api.delete("/me/avatar");
  profileStore.update({ avatar: null });
}