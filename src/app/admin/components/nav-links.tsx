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
      href: `/admin`,
      label: "Overview",
      active: pathname === `/admin`,
    },
    {
      href: `/admin/appointment`,
      label: "Appointment",
      active: pathname === `/admin/appointment`,
    },
    {
      href: `/admin/patients`,
      label: "Patients",
      active: pathname === `/admin/patients`,
    },
    {
      href: `/admin/vaccines`,
      label: "Vaccines",
      active: pathname === `/admin/vaccines`,
    },
    {
      href: `/admin/reports`,
      label: "Reports",
      active: pathname === `/admin/reports`,
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
