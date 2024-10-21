import Link from "next/link";
import React from "react";

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
          Open drawer
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
          <div className="mt-10">
            <Link href="/dashboard/all-user">
              <li className="text-lg lg:text-xl font-bold btn bg-transparent hover:bg-transparent border-0 w-full">
                User Management
              </li>
            </Link>
            <Link href="/dashboard/all-post">
              <li className="text-lg lg:text-xl font-bold btn bg-transparent hover:bg-transparent border-0 w-full">
                Content Moderation
              </li>
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
