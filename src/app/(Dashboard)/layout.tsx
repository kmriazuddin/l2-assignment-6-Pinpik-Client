import React from "react";
import Link from "next/link";
import { FaUserShield } from "react-icons/fa";
import { FaPhotoFilm } from "react-icons/fa6";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content relative">
        {children}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-info drawer-button lg:hidden"
        >
          Open Menu
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-slate-500 min-h-full w-60 lg:w-80 p-4">
          <div>
            <Link href="/">
              <button className="btn cursor-pointer bg-cyan-500 hover:bg-cyan-500 text-white lg:text-2xl font-bold w-full">
                Pinpik
              </button>
            </Link>
          </div>
          <div className="mt-10 lg:space-y-5">
            <Link
              href="/dashboard/all-user"
              className="flex items-center gap-2 bg-sky-500 p-2 rounded hover:bg-pink-500 duration-300 text-white"
            >
              <span className="text-xl">
                <FaUserShield />
              </span>
              <h1 className="text-lg lg:text-xl font-bold bg-transparent hover:bg-transparent border-0 w-full">
                All User
              </h1>
            </Link>
            <Link
              href="/dashboard/all-post"
              className="flex items-center gap-2 bg-sky-500 p-2 rounded hover:bg-pink-500 duration-300 text-white"
            >
              <span className="text-xl">
                <FaPhotoFilm />
              </span>
              <h1 className="text-lg lg:text-xl font-bold bg-transparent hover:bg-transparent border-0 w-full">
                All Content
              </h1>
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
