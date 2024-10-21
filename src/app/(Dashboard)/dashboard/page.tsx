"use client";

import { useTypedSelector } from "@/redux/hooks/useTypedSelector";
import Image from "next/image";
import React from "react";

const Dashboard = () => {
  const user = useTypedSelector((state) => state.auth.user);

  if (!user) {
    return (
      <div className="flex justify-center items-center m-auto">
        <span className="loading loading-spinner loading-lg text-info"></span>
      </div>
    );
  }

  return (
    <div className="bg-white h-screen">
      <div className="scale-100">
        <div className="flex justify-center items-center gap-2 lg:text-xl lg:pt-5">
          <div className="avatar border-2 rounded-full">
            <div className="w-20 rounded-full">
              <Image src={user.avatar} alt={user.name} width={48} height={48} />
            </div>
          </div>
          <div>
            <h1 className="text-rose-500 font-semibold underline">Dashboard</h1>
            {user && user.role === "admin" && (
              <p>
                Welcome{" "}
                <span className="text-cyan-500 font-medium">{user?.name}</span>
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-center pt-2">
          <Image
            src={"https://i.ibb.co.com/SdK0n79/section-title-vector.png"}
            alt="vector"
            width={500}
            height={500}
            className="w-36 lg:w-[20%] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
