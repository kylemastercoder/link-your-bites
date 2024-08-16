import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import UserProfile from "./user-profile";
import { NavLinks } from "./nav-links";

const Navbar = async () => {
  return (
    <div className="border-b hidden md:flex items-center justify-between w-full px-20 py-3">
      <div className="flex items-center gap-x-5">
        <NavLinks />
      </div>
      <div className="flex items-center">
        <div className="relative md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg dark:bg-neutral-800 bg-gray-100 bg-background pl-10 md:w-[200px] lg:w-[336px]"
          />
        </div>
        <p className="ml-4 mr-2 text-gray-300">|</p>
        <UserProfile />
      </div>
    </div>
  );
};

export default Navbar;
