import React from "react";
import Navbar from "./components/navbar";
import { ModalProvider } from "./components/modal-provider";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 h-screen">
      <div className="bg-white flex flex-col gap-2 flex-1 w-full h-full">
        <Navbar />
        {children}
        <ModalProvider />
      </div>
    </div>
  );
};

export default AdminLayout;
