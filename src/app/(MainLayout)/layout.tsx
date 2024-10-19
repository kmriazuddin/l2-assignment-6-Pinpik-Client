import Navbar from "@/components/sharedComponents/Navbar/Navbar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar></Navbar>
      {children}
    </div>
  );
};

export default MainLayout;
