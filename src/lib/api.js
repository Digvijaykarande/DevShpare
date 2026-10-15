// Thin fetch wrapper so every page talks to the backend the same way.
// Pages keep importing their mock data for now; when the API is ready, swap the
// mock import for `api.get("/questions")` (usually inside a small hook) and nothing else changes.
//
// Set VITE_API_URL in .env (e.g. VITE_API_URL=https://dev-shpare-back.vercel.app/api).

const rawUrl = (import.meta.env.VITE_API_URL || "").trim().replace(/\/+$/, "");

// Normalize BASE_URL:
// - If empty or "/api", use "/api" (proxied to backend by Vite in dev and Netlify in prod)
// - If full backend URL is provided (e.g. https://dev-shpare-back.vercel.app), ensure it ends with "/api"
const BASE_URL = (!rawUrl || rawUrl === "/api")
  ? "/api"
  : rawUrl.endsWith("/api")
  ? rawUrl
  : `${rawUrl}/api`;

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

async function request(path, { method = "GET", body, headers, signal } = {}) {
  const token = localStorage.getItem("devsphere_token");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const cleanPath = normalizedPath.startsWith("/api/") ? normalizedPath.slice(4) : normalizedPath;
  const url = `${BASE_URL}${cleanPath}`;

  const res = await fetch(url, {
    method,
    signal,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok)
    throw new ApiError(
      data?.message ?? data?.error ?? res.statusText,
      res.status,
      data,
    );
  return data;
}

export const api = {
  get: (path, opts) => request(path, opts),
  post: (path, body, opts) => request(path, { ...opts, method: "POST", body }),
  put: (path, body, opts) => request(path, { ...opts, method: "PUT", body }),
  patch: (path, body, opts) =>
    request(path, { ...opts, method: "PATCH", body }),
  delete: (path, opts) => request(path, { ...opts, method: "DELETE" }),
};
