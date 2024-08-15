"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignInFormValidation } from "@/functions/validation";
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
import { Eye, EyeOff, Loader } from "lucide-react";
import Link from "next/link";
import { login } from "@/actions/users";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECTS } from "@/routes";

const SignIn = () => {
  const onClick = (provider: "google" | "facebook") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECTS,
    });
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof SignInFormValidation>>({
    resolver: zodResolver(SignInFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignInFormValidation>) => {
    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        }
      });
    });
  };
  return (
    <div className="flex-col">
      <div className="grid gap-2">
        <Image
          src="/assets/images/logo.jpg"
          alt="Logo"
          width="80"
          height="80"
        />
        <h1 className="text-4xl mt-10 font-bold">Welcome Back</h1>
        <p className="text-balance text-muted-foreground mt-3">
          Please enter details associate with your registered account.
        </p>
      </div>
      <div className="flex w-full items-center justify-center gap-3 mt-5">
        <Button
          className="w-full py-6 flex items-center justify-center space-x-3"
          variant="outline"
          onClick={() => onClick("google")}
        >
          <Image
            src="/assets/images/google.png"
            alt="Google"
            width="20"
            height="20"
          />
          <span className="font-semibold">Continue with Google</span>
        </Button>
        <Button
          className="w-full py-6 flex items-center justify-center space-x-3"
          variant="outline"
          onClick={() => onClick("facebook")}
        >
          <Image
            src="/assets/images/fb.png"
            alt="Facebook"
            width="20"
            height="20"
          />
          <span className="font-semibold">Continue with Facebook</span>
        </Button>
      </div>
      <div className="flex items-center my-10">
        <hr className="flex-grow border-zinc-200" />
        <span className="mx-2 text-sm font-semibold text-muted-foreground">
          or
        </span>
        <hr className="flex-grow border-zinc-200" />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
          <FormField
            control={form.control}
            name="password"
            disabled={isPending}
            render={({ field }) => (
              <FormItem className="w-full">
                <div className="flex items-center">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href={`/auth/forgot-password`}
                    className="ml-auto font-semibold inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={passwordVisible ? "text" : "password"}
                      placeholder="--------"
                      {...field}
                    />
                  </FormControl>
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-sm text-muted-foreground">
            By signing in or creating an account, you agree with our{" "}
            <b className="underline">Terms & Conditions</b> and{" "}
            <b className="underline">Privacy Policy</b>.
          </p>
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
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
          <p className="text-center text-md mt-5">
            Don&apos;t have an account?{" "}
            <Link href="/auth/onboarding">
              <b>Register Account</b>
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignIn;
