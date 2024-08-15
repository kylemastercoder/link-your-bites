"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignUpFormValidation } from "@/functions/validation";
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
import { toast } from "sonner";
import { signup } from "@/actions/users";

const SignUp = ({ params }: { params: { role: string } }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof SignUpFormValidation>>({
    resolver: zodResolver(SignUpFormValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignUpFormValidation>) => {
    startTransition(() => {
      signup(values, params.role).then((data) => {
        if (data.error) {
          toast.error(data.error || "");
        } else {
          toast.success(data.success || "");
          // Redirect after a delay to ensure the toast is shown
          router.push(`/auth/verify-email?email=${values.email}`);
        }
      });
    });
  };

  return (
    <div className="flex-col">
      <div className="grid gap-2">
        <Image src="/assets/images/logo.jpg" alt="Logo" width="80" height="80" />
        <h1 className="text-4xl mt-3 font-bold">Create an account</h1>
        <p className="text-balance text-muted-foreground mt-3">
          Describe yourself as clearly so that there are no mistakes.
        </p>
      </div>
      <div className="flex w-full items-center justify-center gap-3 mt-5">
        <Button
          className="w-full py-6 flex items-center justify-center space-x-3"
          variant="outline"
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
        >
          <Image
            src="/assets/images/fb.png"
            alt="Google"
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
            name="name"
            disabled={isPending}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Juan Dela Cruz" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                <FormLabel>Password</FormLabel>
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
            className="w-full"
            disabled={isPending}
            size="lg"
            variant="primary"
            type="submit"
          >
            {isPending ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
          <p className="text-center text-md mt-5">
            Already have an account?{" "}
            <Link href={`/auth/sign-in`}>
              <b>Login</b>
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignUp;
