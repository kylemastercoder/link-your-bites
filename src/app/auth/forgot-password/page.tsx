"use client";

import React, { useTransition } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ForgotPasswordFormValidation } from "@/functions/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { forgotPassword } from "@/actions/users";
import { Loader } from "lucide-react";

const ForgotPassword = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ForgotPasswordFormValidation>>({
    resolver: zodResolver(ForgotPasswordFormValidation),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof ForgotPasswordFormValidation>) {
    startTransition(() => {
      forgotPassword(values).then((data) => {
        if (data?.error) {
          toast.error(data?.error || "");
        } else {
          toast.success(data?.success || "");
        }
      });
    });
  }

  return (
    <div className="flex-col w-full">
      <div className="grid gap-2">
        <Image src="/assets/images/logo.jpg" alt="Logo" width="80" height="80" />
        <h1 className="text-4xl mt-10 font-bold">Reset Password</h1>
        <p className="text-balance text-muted-foreground mt-3">
          Type your email address associated with your account to receive your
          reset password link.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 mt-10"
        >
          <FormField
            control={form.control}
            name="email"
            disabled={isPending}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="juandelacruz@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            className="w-full"
            size="lg"
            variant="primary"
            type="submit"
          >
            {isPending ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Sending Link...
              </>
            ) : (
              "Send Reset Password Link"
            )}
          </Button>
          <p className="text-center text-md mt-5">
            Already have an account?{" "}
            <Link href="/auth/sign-in">
              <b>Login</b>
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPassword;
