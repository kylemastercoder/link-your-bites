"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export function NavLinks({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/staff/dashboard`,
      label: "Overview",
      active: pathname === `/staff/dashboard`,
    },
    {
      href: `/auth/appointment`,
      label: "Appointment",
      active: pathname === `/auth/appointment`,
    },
    {
      href: `/auth/patients`,
      label: "Patients",
      active: pathname === `/auth/patients`,
    },
    {
      href: `/auth/vaccines`,
      label: "Vaccines",
      active: pathname === `/auth/vaccines`,
    },
    {
      href: `/auth/reports`,
      label: "Reports",
      active: pathname === `/auth/reports`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
