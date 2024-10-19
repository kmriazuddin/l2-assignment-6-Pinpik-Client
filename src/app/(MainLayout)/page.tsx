"use client";

import AddPost from "@/components/AddPost/AddPost";
import AllPosts from "@/components/AllPost/AllPosts";

import { useSearchParams } from "next/navigation";

const Home = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("search") || "";

  return (
    <div>
      <AddPost />
      <AllPosts searchQuery={searchQuery} />
    </div>
  );
};

export default Home;
