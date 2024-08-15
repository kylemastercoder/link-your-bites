"use client";

import React, { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NewPasswordFormValidation } from "@/functions/validation";
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
import { newPassword } from "@/actions/users";
import { toast } from "sonner";

const NewPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const form = useForm<z.infer<typeof NewPasswordFormValidation>>({
    resolver: zodResolver(NewPasswordFormValidation),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordFormValidation>) => {
    startTransition(() => {
      newPassword(values, token || "").then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        } else {
          toast.success(data?.success);
          router.push("/sign-in");
        }
      });
    });
  };

  if(!token) {
    router.replace('/auth/sign-in');
  }

  return (
    <div className="flex-col w-full">
      <div className="grid gap-2">
        <Image src="/assets/images/logo.jpg" alt="Logo" width="80" height="80" />
        <h1 className="text-4xl mt-10 font-bold">Create New Password</h1>
        <p className="text-balance text-muted-foreground mt-3">
          Type your new strong password. Your password must include: <br />
          - One capital letter & one small letter at least <br />
          - One special character <br />
          - Minimum of 8 digits long <br />
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 mt-10"
        >
          <FormField
            control={form.control}
            name="newPassword"
            disabled={isPending}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>New Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={newPasswordVisible ? "text" : "password"}
                      placeholder="--------"
                      {...field}
                    />
                  </FormControl>
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                  >
                    {newPasswordVisible ? (
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
          <FormField
            control={form.control}
            name="confirmPassword"
            disabled={isPending}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Confirm New Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={confirmPasswordVisible ? "text" : "password"}
                      placeholder="--------"
                      {...field}
                    />
                  </FormControl>
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() =>
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                  >
                    {confirmPasswordVisible ? (
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
                Resetting Password...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
          <p className="text-center text-md mt-5">
            Already have an account?{" "}
            <Link href="/sign-in">
              <b>Login</b>
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default NewPassword;
