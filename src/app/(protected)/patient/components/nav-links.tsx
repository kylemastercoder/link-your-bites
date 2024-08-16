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
      href: `/patient/dashboard`,
      label: "Overview",
      active: pathname === `/patient/dashboard`,
    },
    {
      href: `/patient/appointment`,
      label: "Appointment",
      active: pathname === `/patient/appointment`,
    },
    {
      href: `/patient/purchases`,
      label: "Purchases",
      active: pathname === `/patient/purchases`,
    },
    {
      href: `/patient/documents`,
      label: "Documents",
      active: pathname === `/patient/documents`,
    },
    {
      href: `/patient/help`,
      label: "Help",
      active: pathname === `/patient/help`,
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
