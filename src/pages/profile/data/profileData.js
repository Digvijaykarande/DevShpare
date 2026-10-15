// Blank starting profile. Real values come from the backend (GET /api/me) after sign-in.
export const PROFILE = {
  name: "",
  username: "",
  email: "",
  emailVerified: false,
  role: "",
  location: "",
  website: "",
  joined: "",
  bio: "",
  avatar: null, // data URL of the uploaded photo (set from Settings → Profile)
  techStack: [],
  currentlyLearning: [],
  socialLinks: [],
};