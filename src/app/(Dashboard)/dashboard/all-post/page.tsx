"use client";

import {
  useDeletePostMutation,
  useGetAllPostPaginationQuery,
} from "@/redux/features/posts/posts.api";
import { useTypedSelector } from "@/redux/hooks/useTypedSelector";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

const AllPost = () => {
  const token = useTypedSelector((state) => state.auth.token);
  const { data, isLoading, refetch } = useGetAllPostPaginationQuery({
    token,
  });

  const [deletePost] = useDeletePostMutation();

  const allPost = data?.data || [];

  if (isLoading) {
    return (
      <div className="min-h-screen min-w-[60vw] flex justify-center items-center m-auto">
        <span className="loading loading-spinner loading-lg text-info"></span>
      </div>
    );
  }

  const handleDeletePost = async (id: string) => {
    try {
      await toast.promise(deletePost({ token, postId: id }), {
        loading: "Deleting post...",
        success: "Post deleted successfully!",
        error: "Failed to delete post. Please try again.",
      });
      refetch();
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("An unexpected error occurred.");
    }
  };
  return (
    <div className="h-screen bg-white">
      <div className="overflow-x-auto">
        <h1 className="text-center mt-8 font-bold text-3xl">All Posts</h1>
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
              <th>Title</th>
              <th>Author</th>
              <th>Premium</th>
              <th>Up Votes</th>
              <th>Down Votes</th>
              <th>Details</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allPost.map((post: any, index: number) => (
              <tr key={post._id} className="text-black font-medium">
                <th>{index + 1}</th>
                <td>{post.title}</td>
                <td>{post?.author?.email}</td>
                <td>{post?.isPremium ? "Yes" : "No"}</td>
                <td>{post.upvotes}</td>
                <td>{post.downvotes}</td>
                <td>
                  <Link href={`/post/${post._id}`}>
                    <button className="btn btn-sm btn-info text-white mr-2">
                      Details
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPost;
