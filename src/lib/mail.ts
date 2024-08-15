import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Email Verification",
    html: `
            <h3>Dear ${email}</h3> <br>
            <p>Thanks for creating a Link Your Bites account. Verify your email so you can appoint and use our system.</p> <br>
            <p>${token}</p> <br>
            <p>This code expires after 15 minutes.</p> <br>
            <p>Once your email is verified, you can start setting up your account. Visit our support site if you have questions or need help.</p>
        `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/new-password?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset Password",
    html: `
            <h3>Dear ${email}</h3> <br>
            <p>We received a request to reset the password for the account associated with this email address. Click the link below to reset your password using our secure server:</p> <br>
            <a href="${resetLink}">Reset Password</a> <br>
            <p>This code expires after 15 minutes.</p> <br>
            <p>Visit our support site if you have questions or need help.</p>
        `,
  });
};
