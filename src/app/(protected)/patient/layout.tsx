import React from "react";
import Navbar from "./components/navbar";

const PatientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 h-screen">
      <div className="bg-white flex flex-col gap-2 flex-1 w-full h-full">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default PatientLayout;
