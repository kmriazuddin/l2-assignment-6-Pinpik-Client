"use client"

import { useGetAllPostQuery } from "@/redux/features/posts/posts.api";
import React from "react";

const Footer = () => {
  const { isLoading } = useGetAllPostQuery(undefined);
  return (
    <>
      {isLoading ? (
        ""
      ) : (
        <footer className="footer footer-center bg-base-300 text-base-content p-4">
          <aside>
            <p>
              Copyright © {new Date().getFullYear()} - All right reserved by
              Pinpik
            </p>
          </aside>
        </footer>
      )}
    </>
  );
};

export default Footer;
