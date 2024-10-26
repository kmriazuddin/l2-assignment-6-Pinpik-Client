"use client";

import React from "react";
import { useTypedSelector } from "@/redux/hooks/useTypedSelector";
import {
  useGetAllUserQuery,
  useUserRoleUpdateMutation,
} from "@/redux/features/auth/auth.api";
import toast from "react-hot-toast";
import { TTableUser } from "@/types/comment.type";
import Image from "next/image";

const AllUser = () => {
  const token = useTypedSelector((state) => state.auth.token);
  const [updateRole] = useUserRoleUpdateMutation();

  const { data, isLoading, refetch } = useGetAllUserQuery({ token });
  if (isLoading) {
    return (
      <div className="min-h-screen min-w-[60vw] flex justify-center items-center m-auto">
        <span className="loading loading-spinner loading-lg text-info"></span>
      </div>
    );
  }
  const allUser = data?.data || [];

  const handleAdmin = async (id: string) => {
    const updateInfo = {
      role: "admin",
    };

    try {
      const res = await updateRole({ token, updateInfo, userId: id });
      if (res.data.success === true) {
        toast.success("Update the role!");
        refetch();
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  const handleUser = async (id: string) => {
    const updateInfo = {
      role: "user",
    };

    try {
      const res = await updateRole({ token, updateInfo, userId: id });
      if (res.data.success === true) {
        toast.success("Update the role!");
        refetch();
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="overflow-x-auto bg-white h-screen">
      <h1 className="text-center mt-8 font-bold text-3xl">All Users</h1>
      <div className="flex justify-center pt-2">
        <Image
          src={"https://i.ibb.co.com/SdK0n79/section-title-vector.png"}
          alt="vector"
          width={500}
          height={500}
          className="w-36 lg:w-[20%] object-cover"
        />
      </div>
      <table className="table lg:mt-10">
        {/* head */}
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Email</th>
            <th>Premium</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {allUser.map((user: TTableUser, index: number) => {
            console.log(user.isPremium);

            return (
              <tr key={user._id} className="text-black font-medium">
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isPremium ? "true" : "false"}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === "admin" ? (
                    user?.role === "admin" ? (
                      <button
                        onClick={() => handleUser(user._id)}
                        className="btn btn-sm btn-secondary text-white"
                      >
                        Admin To User
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUser(user._id)}
                        className="btn btn-sm"
                      >
                        Admin To User
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => handleAdmin(user._id)}
                      className="btn btn-sm btn-info text-white"
                    >
                      User To Admin
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllUser;
