// an array or routes that are accessible to the public
export const publicRoutes = ["/", "/auth/verify-email", "/auth/sign-in"];

// an array or routes that are used for authentication
export const authRoutes = [
  "/auth/onboarding",
  "/auth/sign-in",
  "/auth/forgot-password",
  "/auth/new-password",
  "/auth/patient/sign-up",
  "/auth/staff/sign-up",
];

export const apiAuthRoutes = "/api/auth";

export const DEFAULT_LOGIN_REDIRECTS = "/auth/sign-in";
