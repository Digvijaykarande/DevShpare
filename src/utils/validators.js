// Small, dependency-free validators. Each returns an error message string,
// or "" when the value is valid, so forms can do `const error = validateX(value)`.

export function validateFullName(value) {
  const v = value.trim();
  if (!v) return "Enter your full name.";
  if (v.length < 2) return "Name must be at least 2 characters.";
  if (v.length > 60) return "Name must be 60 characters or fewer.";
  return "";
}

export function validateUsername(value) {
  const v = value.trim();
  if (!v) return "Choose a username.";
  if (v.length < 3) return "Username must be at least 3 characters.";
  if (v.length > 30) return "Username must be 30 characters or fewer.";
  if (!/^[a-z0-9._-]+$/.test(v)) return "Use lowercase letters, numbers, dots, dashes or underscores.";
  return "";
}

export function validateWebsite(value) {
  const v = value.trim();
  if (!v) return ""; // optional
  try {
    const url = new URL(v);
    if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error("protocol");
    if (!url.hostname.includes(".")) throw new Error("host");
    return "";
  } catch {
    return "Enter a full link, like https://yoursite.dev.";
  }
}

export function validatePassword(value) {
  if (value.length < 8) return "Use at least 8 characters.";
  if (!/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/\d/.test(value)) {
    return "Mix uppercase, lowercase and a number.";
  }
  return "";
}
