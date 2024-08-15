"use client";

import React, { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { VerifyEmailFormValidation } from "@/functions/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import Link from "next/link";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { resendCode, verifyEmail } from "@/actions/users";
import { generateVerificationToken } from "@/lib/tokens";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const decodedEmail = decodeURIComponent(email ?? "");

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const maskEmail = (email: string) => {
    const [localPart, domain] = email.split("@");
    const maskedLocalPart =
      localPart.length > 3
        ? `${"*".repeat(localPart.length - 3)}${localPart.slice(-3)}`
        : localPart;
    return `${maskedLocalPart}@${domain}`;
  };

  const maskedEmail = decodedEmail ? maskEmail(decodedEmail) : "";
  const form = useForm<z.infer<typeof VerifyEmailFormValidation>>({
    resolver: zodResolver(VerifyEmailFormValidation),
    defaultValues: {
      otpCode: "",
    },
  });

  const onSubmit = (values: z.infer<typeof VerifyEmailFormValidation>) => {
    startTransition(() => {
      verifyEmail(values).then((data) => {
        if (data?.error) {
          toast.error(data?.error || "");
        } else {
          toast.success(data?.success || "");
          router.push('/auth/sign-in');
        }
      });
    });
  };

  const onResendCode = (email: string) => {
    startTransition(() => {
      resendCode(email).then((data) => {
        toast.success(data?.success || "");
      });
    });
  };

  if(!email) {
    router.replace('/auth/sign-in');
  }

  return (
    <div className="flex-col w-full">
      <div className="grid gap-2">
        <Image src="/assets/images/logo.jpg" alt="Logo" width="80" height="80" />
        <h1 className="text-4xl mt-10 font-bold">Verify Your Email Address</h1>
        <p className="text-balance text-muted-foreground mt-3">
          Enter the OTP code that we sent to your email address {maskedEmail}{" "}
          and be careful not to share the code with anyone.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 mt-10"
        >
          <FormField
            control={form.control}
            name="otpCode"
            disabled={isPending}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <InputOTPGroup className="w-full flex justify-center gap-x-12">
                      <InputOTPSlot
                        className="justify-center flex border border-zinc-300 rounded-lg size-16"
                        index={0}
                      />
                      <InputOTPSlot
                        className="justify-center flex border border-zinc-300 rounded-lg size-16"
                        index={1}
                      />
                      <InputOTPSlot
                        className="justify-center flex border border-zinc-300 rounded-lg size-16"
                        index={2}
                      />
                      <InputOTPSlot
                        className="justify-center flex border border-zinc-300 rounded-lg size-16"
                        index={3}
                      />
                      <InputOTPSlot
                        className="justify-center flex border border-zinc-300 rounded-lg size-16"
                        index={4}
                      />
                      <InputOTPSlot
                        className="justify-center flex border border-zinc-300 rounded-lg size-16"
                        index={5}
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full"
            disabled={isPending}
            size="lg"
            variant="primary"
            type="submit"
          >
            {isPending ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Verifying Email...
              </>
            ) : (
              "Verify Email"
            )}
          </Button>
          <p className="text-center text-md mt-5"></p>
        </form>
      </Form>
      <Button
        type="button"
        variant="ghost"
        disabled={isPending}
        className="flex items-center justify-center w-full"
        onClick={() => onResendCode(decodedEmail)}
      >
        <b className="underline">Send code again</b>
      </Button>
    </div>
  );
};

export default VerifyEmail;
