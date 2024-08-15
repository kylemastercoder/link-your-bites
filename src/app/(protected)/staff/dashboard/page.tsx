"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Dashboard = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/auth/sign-in", // Specify the redirection URL
    });
    router.push("/auth/sign-in"); // Manually redirect to the desired URL
  };

  if (user?.role === "patient") {
    router.replace("/patient/dashboard");
  }
  if (!user) {
    router.replace("/auth/sign-in");
  }
  return (
    <div>
      <h1>Staff: </h1>
      {JSON.stringify(user)}
      <Button onClick={handleSignOut}>Logout</Button>
    </div>
  );
};

export default Dashboard;
