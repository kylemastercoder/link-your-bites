"use server";

import {
  ForgotPasswordFormValidation,
  NewPasswordFormValidation,
  SignInFormValidation,
  SignUpFormValidation,
  VerifyEmailFormValidation,
} from "@/functions/validation";
import * as z from "zod";
import bcryptjs from "bcryptjs";
import db from "@/lib/db";
import { getUserByEmail } from "@/lib/data";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECTS } from "@/routes";
import {
  generatePasswordResetToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { sendPasswordResetEmail, sendVerificationEmail } from "@/lib/mail";
import { getVerificationTokenByToken } from "@/lib/verification-token";
import { getPasswordResetTokenByToken } from "@/lib/password-reset-token";
import { redirect } from "next/navigation";

export const signup = async (
  values: z.infer<typeof SignUpFormValidation>,
  role: string
) => {
  const validatedField = SignUpFormValidation.safeParse(values);

  if (!validatedField.success) {
    return { error: "Invalid Fields!" };
  }

  const { name, email, password } = validatedField.data;
  const hashedPassword = await bcryptjs.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already exist. Please try a new one." };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return {
    success:
      "Your verification code was sent associated with your email address!",
  };
};

export const login = async (values: z.infer<typeof SignInFormValidation>) => {
  const validatedField = SignInFormValidation.safeParse(values);

  if (!validatedField.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password } = validatedField.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "User does not exist" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return {
      success:
        "Your verification code was sent associated with your email address!",
    };
  }

  try {
    await signIn("credentials", {
      redirect:false,
      email,
      password,
    });

    if (existingUser.role === "patient") {
      redirect("/patient/dashboard");
    } else {
      redirect("/staff/dashboard");
    }

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
};

export const verifyEmail = async (
  values: z.infer<typeof VerifyEmailFormValidation>
) => {
  const validatedField = VerifyEmailFormValidation.safeParse(values);

  if (!validatedField.success) {
    return { error: "Invalid Fields!" };
  }

  const { otpCode } = validatedField.data;

  const existingToken = await getVerificationTokenByToken(otpCode);

  if (!existingToken) {
    return { error: "Invalid OTP code" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "OTP code has expired. Please generate a new one." };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email address does not exist." };
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return {
    success: "Your account has been verified",
  };
};

export const resendCode = async (email: string) => {
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return {
    success:
      "Your verification code was sent associated with your email address!",
  };
};

export const forgotPassword = async (
  values: z.infer<typeof ForgotPasswordFormValidation>
) => {
  const validatedField = ForgotPasswordFormValidation.safeParse(values);

  if (!validatedField.success) {
    return { error: "Invalid Fields!" };
  }

  const { email } = validatedField.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "User does not exist" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return {
    success:
      "Your reset password link was sent associated with your email address!",
  };
};

export const newPassword = async (
  values: z.infer<typeof NewPasswordFormValidation>,
  token: string
) => {
  if (!token) {
    return { error: "Missing token" };
  }

  const validatedField = NewPasswordFormValidation.safeParse(values);

  if (!validatedField.success) {
    return {
      error: "Invalid Fields",
    };
  }

  const { newPassword, confirmPassword } = validatedField.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return {
      error: "Invalid Token",
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email address does not exist." };
  }

  if (newPassword !== confirmPassword) {
    return { error: "New password and confirm password does not matched" };
  }

  const hashedPassword = await bcryptjs.hash(newPassword, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return {
    success: "Password updated successfully!",
  };
};
