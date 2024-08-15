"use client";

import AvatarCircles from "@/components/ui/multiple-avatar-circle";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const avatarUrls = [
  "https://avatars.githubusercontent.com/u/16860528",
  "https://avatars.githubusercontent.com/u/20110627",
  "https://avatars.githubusercontent.com/u/106103625",
  "https://avatars.githubusercontent.com/u/59228569",
];

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const getBackgroundImage = () => {
    switch (true) {
      case pathname === "/auth/verify-email":
        return "/assets/images/verify-email.jpg";
      case pathname === "auth/patient/sign-up":
      case pathname === "/auth/staff/sign-up":
        return "/assets/images/auth-bg.jpg";
      case pathname === "/auth/onboarding":
        return "/assets/images/onboarding.jpg";
      case pathname === "/auth/sign-in":
        return "/assets/images/signin.jpg";
      case pathname === "/auth/forgot-password":
        return "/assets/images/forgot-password.jpg";
      case pathname === "/auth/new-password":
        return "/assets/images/new-password.jpg";
      default:
        return "/default.jpg";
    }
  };

  return (
    <>
      <div className="w-full lg:grid lg:grid-cols-5 overflow-hidden">
        <div className="col-span-2 flex px-16 py-10">{children}</div>
        <div className="hidden lg:block relative col-span-3">
          <Image
            src={getBackgroundImage()}
            alt="Background Image"
            width="1920"
            height="1080"
            className="w-full h-screen object-cover object-bottom brightness-[0.6]"
          />
          <div className="absolute px-20 bottom-20">
            <div className="flex flex-col items-center">
              <p className="text-white text-center leading-7 text-lg italic">
                &quot;I recently had to visit the Santiago Animal Bite Center
                after my dog got into a scuffle with a stray. From the moment I
                arrived, I was impressed with the level of care and
                professionalism exhibited by the entire staff.&quot;
              </p>
              <AvatarCircles
                className="mt-4"
                numPeople={5}
                avatarUrls={avatarUrls}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
