"use client";

import Footer from "@/components/SharedComponents/Footer/Footer";
import {
  useGetFollowersQuery,
  useGetFollowingsQuery,
  useUnfollowMutation,
} from "@/redux/features/followers/followers.api";
import { useTypedSelector } from "@/redux/hooks/useTypedSelector";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

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
  const [unfollow] = useUnfollowMutation();

  const userId = user?.id;
  const {
    data: followers,
    isLoading,
    refetch,
  } = useGetFollowersQuery({
    token,
    userId,
  });
  const { data: followings, isLoading: followingLoading } =
    useGetFollowingsQuery({ token, userId }, { skip: !followers });

  useEffect(() => {
    if (followers?.data?.length && userId && token) {
      refetch();
    }
  }, [followers, userId, token, refetch]);

  const handleUnFollow = async (id: string) => {
    console.log(id);

    const updatedData = {
      userId: user?.id,
      followingId: id,
    };
    try {
      const res = await unfollow({ token, updatedData });
      if (res.data.success === true) {
        toast.success("You have successfully un Follow!");
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    <div className="bg-white min-h-[calc(100vh-68px)]">
      <div className="pt-24 max-w-7xl mx-auto h-screen">
        <h1 className=" text-xl lg:text-4xl font-bold text-center">
          Followers and Following
        </h1>
        <div className="flex justify-around items-center mt-12 flex-col lg:flex-row">
          <div className="space-y-5">
            <h1 className="font-bold text-2xl">Follower User</h1>
            <div>
              {followers?.data.map((follower: Follower) => (
                <p
                  className="w-[250px] border-2 p-1 rounded-md m-1"
                  key={follower._id}
                >
                  {follower.userId.name}
                </p>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <h1 className="font-bold text-2xl">Following User</h1>
            <div>
              {followings?.data.map((following: FollowingUser) => (
                <div key={following._id}>
                  <div className="flex gap-2 justify-center items-center">
                    <p className="w-[250px] border-2 p-1 rounded-md m-1">
                      {following.name}
                    </p>
                    <button
                      onClick={() => handleUnFollow(following._id)}
                      className="btn btn-sm btn-outline bg-cyan-500 hover:bg-rose-500 text-white"
                    >
                      Unfollow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Followers;
