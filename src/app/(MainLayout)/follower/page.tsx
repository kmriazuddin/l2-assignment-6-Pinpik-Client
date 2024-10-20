"use client";

import {
  useGetFollowersQuery,
  useGetFollowingsQuery,
} from "@/redux/features/followers/followers.api";
import { useTypedSelector } from "@/redux/hooks/useTypedSelector";
import React from "react";

interface User {
  _id: string;
  name: string;
  email: string;
}
interface Follower {
  _id: string;
  userId: User;
}
interface FollowingUser {
  _id: string;
  name: string;
  email: string;
}

const Followers = () => {
  const user = useTypedSelector((state) => state.auth.user);
  const token = useTypedSelector((state) => state.auth.token);

  const userId = user?.id;
  const { data: followers, isLoading } = useGetFollowersQuery({
    token,
    userId,
  });
  const { data: followings, isLoading: followingLoading } =
    useGetFollowingsQuery({ token, userId }, { skip: !followers });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center m-auto">
        <span className="loading loading-spinner loading-lg text-info"></span>
      </div>
    );
  }
  if (followingLoading) {
    return (
      <div className="flex justify-center items-center m-auto">
        <span className="loading loading-spinner loading-lg text-info"></span>
      </div>
    );
  }

  return (
    <div className="mt-24 max-w-7xl mx-auto">
      <h1 className=" text-xl lg:text-4xl font-bold text-center">
        Followers and Following
      </h1>
      <div className="flex justify-around items-center mt-12">
        <div className="space-y-5">
          <h1 className="font-bold text-2xl">Follower User</h1>
          <div>
            {followers?.data.map((follower: Follower) => (
              <p key={follower._id}>{follower.userId.name}</p>
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <h1 className="font-bold text-2xl">Following User</h1>
          <div>
            {followings?.data.map((following: FollowingUser) => (
              <p key={following._id}>{following.name}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Followers;
