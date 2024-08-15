import { z } from "zod";

export const SignUpFormValidation = z.object({
  name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(100, { message: "First name must be at most 100 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(8, { message: "Email address must be at least 8 characters" })
    .max(50, { message: "Email address must be at most 50 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

export const SignInFormValidation = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(8, { message: "Email address must be at least 8 characters" })
    .max(50, { message: "Email address must be at most 50 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

export const ForgotPasswordFormValidation = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(8, { message: "Email address must be at least 8 characters" })
    .max(50, { message: "Email address must be at most 50 characters" }),
});

export const NewPasswordFormValidation = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  export const VerifyEmailFormValidation = z.object({
    otpCode: z
      .string()
      .min(6, { message: "OTP code must be at least 6 characters" })
  });
