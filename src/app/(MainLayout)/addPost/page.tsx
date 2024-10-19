"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useAddPostMutation } from "@/redux/features/posts/posts.api";
import { useUploadImageMutation } from "@/redux/features/uploadImage/uploadImage.api";
import toast from "react-hot-toast";
import { useTypedSelector } from "@/redux/hooks/useTypedSelector";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

// const getErrorMessage = () => {
//   if (error && 'data' in error) {
//     return (error.data as any)?.message || "Error uploading image.";
//   }
//   return "An unexpected error occurred.";
// };

const AddPost = () => {
  const token = useTypedSelector((state) => state.auth.token);

  const user = useTypedSelector((state) => state.auth.user);
  const userId = user?.id;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [imgLink, setImageLink] = useState("");
  const [addPost] = useAddPostMutation();
  const [uploadImage, { isLoading, isSuccess, isError }] =
    useUploadImageMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return toast.error("No file");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadImage({ data: formData }).unwrap();
      if (res.success === true) {
        toast.success("Image uploaded successfully");
        setImageLink(res.data.link); // Store the image link
      }
    } catch (err) {
      toast.error("Upload failed");
      console.error("Upload failed:", err);
    }
  };

  const handleAddPost = async () => {
    if (!title.trim()) {
      return toast.error("Title cannot be empty");
    }

    if (tags.length === 0) {
      return toast.error("Please add at least one tag");
    }

    if (!imgLink) {
      return toast.error("Thumbnail image is required");
    }

    if (!content.trim()) {
      return toast.error("Content cannot be empty");
    }

    const data = {
      title,
      content,
      author: userId,
      images: imgLink ? [imgLink] : [],
      tags,
      category: "Gardening",
      upvotes: 0,
      downvotes: 0,
      isPremium: false,
      voters: [],
    };
    try {
      const res = await addPost({ data, token });
      console.log(res);
      if (res.data.success === true) {
        toast.success("Post created successfully");
      } else {
        toast.error("Post is not created");
        toast.error("In content image size should be within 500kb");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const tagArray = value.split(",").map((tag) => tag.trim());
    setTags(tagArray);
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      ["link", "image", "video", "formula"],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "header",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "formula",
    "align",
    "color",
    "background",
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto mt-24 p-5">
        <label>
          Title <span className="text-red-400">*</span>
        </label>
        <input
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Type here"
          className="input input-bordered w-full max-w-full mb-5 mt-2"
        />

        <div>
          <label className="">
            Upload Thumbnail <span className="text-red-400">*</span>
          </label>
          <br />
          <input
            className="file-input file-input-bordered w-full max-w-xs mb-5 mt-3 mr-5"
            type="file"
            onChange={handleFileChange}
          />
          <button
            className="btn btn-sm btn-outline btn-success"
            onClick={handleUpload}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Upload Image"
            )}
          </button>
          {isSuccess && <p>Image uploaded successfully!</p>}
          {isError && <p>Error uploading</p>}
        </div>

        <div>
          <label className="">
            Content <span className="text-red-400">*</span>
          </label>
          <div className="mb-20 mt-2">
            <QuillEditor
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              style={{ height: "350px" }}
            />
          </div>
        </div>
        <div className="lg:p-0 pt-20">
          <label className="">
            Tags:<span className="text-red-400">*</span>{" "}
          </label>
          <input
            required
            type="text"
            placeholder="Ex - Gardening, Tips, Plants, Horticulture"
            className="input input-bordered w-full max-w-xl"
            onChange={handleTagsChange}
          />
        </div>

        <button
          onClick={handleAddPost}
          className="btn btn-outline btn-success mt-5"
        >
          Create Post
        </button>
      </div>
    </>
  );
};

export default AddPost;
