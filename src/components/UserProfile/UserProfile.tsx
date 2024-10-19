"use client";

import { useGetPostByUserIdQuery } from "@/redux/features/posts/posts.api";
import { useTypedSelector } from "@/redux/hooks/useTypedSelector";
import { IPost } from "@/types/post.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";

const UserProfile = () => {
  const token = useTypedSelector((state) => state.auth.token);
  const user = useTypedSelector((state) => state.auth.user);
  const userId = user?.id;
  const { data, isLoading } = useGetPostByUserIdQuery({ userId, token });
  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log(data);

  const stripHtmlTags = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  return (
    <div className="grid gap-6 justify-center mt-24">
      {data.data.map((post: IPost) => {
        return (
          <div
            key={post._id}
            className="card card-compact bg-base-100 shadow-xl"
          >
            <figure>
              <img
                src={post.images[0] || "https://via.placeholder.com/400"}
                alt={post.title}
                className="w-full h-[450px] object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p>
                {stripHtmlTags(post.content).substring(0, 100)}...{" "}
                <Link
                  href={`post/${post._id}`}
                  className="btn btn-primary btn-sm"
                >
                  Read More
                </Link>
              </p>
              <div className="flex">
                <p className="flex items-center gap-3">
                  Upvotes: {post.upvotes}{" "}
                  <span>
                    <BiUpvote />
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  Downvotes: {post.downvotes}{" "}
                  <span>
                    <BiDownvote />
                  </span>
                </p>
                {post.author && (
                  <div className="flex items-center gap-2 cursor-pointer">
                    <div className="w-12 rounded-full">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={48}
                        height={48}
                      />
                    </div>
                    <p>{post.author.name || "Anonymous"}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserProfile;
