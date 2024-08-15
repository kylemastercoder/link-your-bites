"use client";

import { PasskeyModal } from "@/components/modals/passkey-modal";
import { Button } from "@/components/ui/button";
import { UserRoundCheck, UserRoundCog } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Onboarding = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const router = useRouter();

  const handleAdminClick = () => {
    setIsModalOpen(true);
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  return (
    <div className="flex-col">
      {isModalOpen && <PasskeyModal />}
      <div className="grid gap-2">
        <Image src="/assets/images/logo.jpg" alt="Logo" width="80" height="80" />
        <h1 className="text-4xl mt-10 font-bold">Join by your role</h1>
        <p className="text-balance text-muted-foreground mt-3">
          Choose the right role for your account before entering the
          registration form, this option can&apos;t be undone, so please be
          careful.
        </p>
      </div>
      <div className="flex md:flex-row flex-col items-center w-full gap-3 mt-10">
        <label className="cursor-pointer w-full">
          <input
            type="radio"
            className="peer sr-only"
            name="role"
            onChange={() => handleRoleSelect("patient")}
          />
          <div className="w-full rounded-md bg-white peer-checked:text-zinc-200 p-5 ring-2 ring-transparent transition-all shadow-md border peer-checked:bg-primaryGradient peer-checked:ring-amber-800 peer-checked:ring-offset-2">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <UserRoundCheck size={24} />
                <div>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <p>
                  <span className="text-lg font-bold">I am</span> Patient
                </p>
                <p className="text-sm">You need to verify your email before you can sign in to our site.</p>
                <Button
                  onClick={() => router.push(`/auth/patient/sign-up`)}
                  variant="primary"
                  size="sm"
                  className="mt-5"
                  disabled={selectedRole !== "patient"}
                >
                  Continue as Patient
                </Button>
              </div>
            </div>
          </div>
        </label>
        <label className="cursor-pointer w-full">
          <input
            type="radio"
            className="peer sr-only"
            name="role"
            onChange={() => handleRoleSelect("staff")}
          />
          <div className="w-full rounded-md bg-white peer-checked:text-zinc-200 p-5 ring-2 ring-transparent transition-all shadow-md border peer-checked:bg-primaryGradient peer-checked:ring-amber-800 peer-checked:ring-offset-2">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <UserRoundCog size={24} />
                <div>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <p>
                  <span className="text-lg font-bold">I am</span> Staff
                </p>
                <p className="text-sm">Our admin will first verify your account to confirm if you are a legitimate staff member.</p>
                <Button
                  onClick={() => router.push(`/auth/staff/sign-up`)}
                  variant="primary"
                  size="sm"
                  className="mt-5"
                  disabled={selectedRole !== "staff"}
                >
                  Continue as Staff
                </Button>
              </div>
            </div>
          </div>
        </label>
      </div>
      <div className="mt-10">
        <Button
          onClick={handleAdminClick}
          className="w-full"
          variant="primary"
          size="lg"
        >
          Continue as Admin
        </Button>
        <p className="text-center text-md mt-5">
          Already have an account?{" "}
          <Link href="/auth/sign-in">
            <b>Login</b>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Onboarding;
