import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { IPost } from "@/types/post.type";

import toast from "react-hot-toast";
import { useTypedSelector } from "@/redux/hooks/useTypedSelector";
import { useUploadImageMutation } from "@/redux/features/uploadImage/uploadImage.api";
import { useUpdatePostMutation } from "@/redux/features/posts/posts.api";

type TModal = {
  showPostUpdateModal: boolean;
  setShowPostUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  post: IPost | undefined;
  refetch: () => Promise<any>;
};

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const PostUpdateModal = ({
  showPostUpdateModal,
  setShowPostUpdateModal,
  post,
  refetch,
}: TModal) => {
  const [updatePost] = useUpdatePostMutation();
  const token = useTypedSelector((state) => state.auth.token);
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [tags, setTags] = useState<string[]>(post?.tags || []);
  const [file, setFile] = useState<File | null>(null);
  const [imgLink, setImageLink] = useState(post?.images?.[0] || "");
  const [uploadImage, { isLoading, isSuccess, isError }] =
    useUploadImageMutation();

  useEffect(() => {
    setTags(post?.tags || []);
    setTitle(post?.title || "");
    setContent(post?.content || "");
    setTags(post?.tags || []);
    setImageLink(post?.images?.[0] || "");
  }, [post]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return toast.error("No file selected");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadImage({ data: formData }).unwrap();
      if (res.success === true) {
        toast.success("Image uploaded successfully");
        setImageLink(res.data.link);
      }
    } catch (err) {
      toast.error("Image upload failed");
      console.error("Upload error:", err);
    }
  };

  const handleUpdatePost = async () => {
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

    const updatedPostData = {
      title,
      content,
      tags,
      images: imgLink ? [imgLink] : [],
      category: "Gardening",
    };

    try {
      const res = await updatePost({
        data: updatedPostData,
        token,
        postId: post?._id,
      });
      if (res.data.success) {
        toast.success("Post updated successfully");
        setShowPostUpdateModal(false);
        refetch();
      } else {
        toast.error("Failed to update the post");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Error updating post");
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
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
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
  ];

  return (
    <>
      {showPostUpdateModal && (
        <dialog
          id="my_modal_5"
          className="modal modal-bottom max-w-3xl mx-auto"
          open
        >
          <div className="modal-box border-2 bg-white">
            <h3 className="font-bold text-lg mb-5">Update Post</h3>

            <label>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="input input-bordered w-full mb-5 mt-3"
            />

            <label>Upload Thumbnail</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full mb-5"
            />
            <button
              className="btn btn-sm btn-outline btn-info"
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
            {isError && <p>Error uploading image</p>}

            <div className="mt-5">
              <label>Content</label>
              <div className="mb-5 mt-3">
                <QuillEditor
                  modules={modules}
                  formats={formats}
                  style={{ height: "250px" }}
                  value={content}
                  onChange={setContent}
                />
              </div>
            </div>

            <div className="mt-16">
              <label>Tags</label>
              <input
                type="text"
                value={tags.join(",")}
                onChange={handleTagsChange}
                className="input input-bordered w-full mb-5 mt-3"
              />
            </div>
            <div className="modal-action">
              <button
                onClick={handleUpdatePost}
                className="btn btn-outline btn-info"
              >
                Update Post
              </button>
              <button
                onClick={() => setShowPostUpdateModal(false)}
                className="btn btn-error"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default PostUpdateModal;
