"use client";

import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  useAppDispatch,
  useTypedSelector,
} from "@/redux/hooks/useTypedSelector";
import Image from "next/image";
import toast from "react-hot-toast";
import { Logout } from "@/redux/features/auth/authSlice";
import { MdWorkspacePremium } from "react-icons/md";

const Navbar = () => {
  const pathname = usePathname();

  const [searchQueryStr, setSearchQueryStr] = useState("");

  const isActive = (path: string) => pathname === path;

  const user = useTypedSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  function handleLogOut() {
    toast.success("Log Out successfully");
    dispatch(Logout());
  }

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      router.push(`/?search=${searchQueryStr}`);
    }
  };

  return (
    <>
      <div className="bg-[#2DA64D] fixed top-0 left-0 right-0 z-10 w-full">
        <div className="navbar max-w-7xl mx-auto ">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Parent</a>
                  <ul className="p-2">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>Item 3</a>
                </li>
              </ul>
            </div>
            <Link
              href="/"
              className="btn btn-ghost text-base lg:text-xl font-bold text-white"
            >
              Petal Post
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="px-1 flex justify-center items-center gap-32">
              <Link href="/">
                <li
                  className={
                    isActive("/")
                      ? "border-b-4 border-b-[#9EF01A] w-12 p-2"
                      : ""
                  }
                >
                  <FaHome className="text-white text-2xl w-full mx-auto" />
                </li>
              </Link>
              <Link href="/followers">
                <li
                  className={
                    isActive("/followers")
                      ? "border-b-4 border-b-[#9EF01A] w-12 p-2"
                      : ""
                  }
                >
                  <IoIosPeople className="text-white text-2xl w-full mx-auto" />
                </li>
              </Link>
            </ul>
          </div>
          <div className="navbar-end">
            <div className="flex items-center">
              <input
                type="text"
                value={searchQueryStr}
                onChange={(e) => setSearchQueryStr(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search posts..."
                className="input input-sm input-bordered w-full max-w-[250px] mr-5"
              />
            </div>
            {user && user.avatar ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="">
                  <div className="avatar relative">
                    <div className="w-12 rounded-full">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={48}
                        height={48}
                      />
                    </div>
                    <div>
                      {user.isPremium === true && (
                        <MdWorkspacePremium className="text-3xl text-[#FFD700] absolute top-[50%] left-[55%]" />
                      )}
                    </div>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <Link href="/userProfile">{user?.name}</Link>
                  </li>
                  <li>
                    <Link href="/membership">Get Verified</Link>
                  </li>
                  <li>
                    <a onClick={handleLogOut}>Logout</a>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                href="/login"
                className="btn bg-[#70e000] border-0 hover:bg-[#9ef01a]"
              >
                Join Us
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
