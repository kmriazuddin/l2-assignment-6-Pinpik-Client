"use client";

import AllPosts from "@/components/AllPost/AllPosts";
import Footer from "@/components/SharedComponents/Footer/Footer";

import { useSearchParams } from "next/navigation";

const Home = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("search") || "";

  return (
    <div className="px-2 md:px-0 lg:px-0 pt-20 bg-white">
      <AllPosts searchQuery={searchQuery} />
      <Footer />
    </div>
  );
};

export default Home;
