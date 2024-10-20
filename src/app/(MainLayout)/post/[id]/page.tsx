"use client";
import {
  useGetCommentByPostIdQuery,
  useGetSinglePostQuery,
} from "@/redux/features/posts/posts.api";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import Image from "next/image";
import { TComment } from "@/types/comment.type";
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/redux/features/comments/comments.api";
import toast from "react-hot-toast";
import { useTypedSelector } from "@/redux/hooks/useTypedSelector";
import Footer from "@/components/SharedComponents/Footer/Footer";

interface CommentErrorType {
  status?: number;
}

type TParams = {
  params: {
    id: string;
  };
};

const PostDetails = ({ params }: TParams) => {
  const [comment, setComment] = useState("");
  const [updateComment, setUpdateComment] = useState("");
  const [commentId, setCommentId] = useState("");
  const [commentedUserId, setCommentedUserId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [addCommentModal, setAddCommentModal] = useState(false);
  const [updateCommentModal, setUpdateCommentModal] = useState(false);
  const token = useTypedSelector((state) => state.auth.token);

  const user = useTypedSelector((state) => state.auth.user);

  const userId = user?.id;

  const { id } = params;
  const { data, isLoading, error } = useGetSinglePostQuery({ id, token });

  const {
    data: allComments,
    refetch,
    error: commentError,
  } = useGetCommentByPostIdQuery({ id, token }, { skip: !data });

  const isCommentErrorWithStatus = (error: any): error is CommentErrorType => {
    return error && typeof error.status === "number";
  };
  const comments =
    isCommentErrorWithStatus(commentError) && commentError.status === 404
      ? []
      : allComments?.data || [];

  console.log(commentError);

  const [addComment] = useAddCommentMutation();
  const [upComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center m-auto">
        <span className="loading loading-spinner loading-lg text-info"></span>
      </div>
    );
  }

  if (error) {
    return <p>Error loading post details.</p>;
  }

  const singlePostData = data?.data || {};
  const { title, content, images, tags, category, upvotes, downvotes, author } =
    singlePostData;

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(comment);
    const commentData = {
      postId: id,
      userId,
      comment,
      replies: [],
    };
    try {
      const res = await addComment({ id, token, commentData });
      if (res.data?.success === true) {
        toast.success("Comment has been added!!");
        refetch();
        setAddCommentModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateComment = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(updateComment, commentId);
    const updateCommentData = {
      comment: updateComment,
    };
    if (userId !== commentedUserId) {
      return toast.error("You are not authorized to update this comment");
    }
    try {
      const res = await upComment({
        postId: id,
        commentId,
        token,
        updateCommentData,
      });
      if (res.data?.success === true) {
        toast.success("Comment updated successfully!!");
        refetch();
        setShowModal(false);
        setUpdateCommentModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async () => {
    if (userId !== commentedUserId) {
      return toast.error("You are not authorized to delete this comment");
    }
    try {
      const res = await deleteComment({ postId: id, commentId, token });
      console.log(res);

      if (res.data?.success === true) {
        toast.success("Comment deleted successfully!!");
        refetch();
        setShowModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto p-5 pt-24">
        <div className="mb-4">
          <h1 className="text-3xl font-bold mb-3">{title} </h1>
          <span>
            <i>
              --by <b>{author?.name}</b>
            </i>
          </span>
        </div>

        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
          {images?.map((image: string, index: number) => (
            <SwiperSlide key={index}>
              <Image
                src={image}
                alt={`Post image ${index + 1}`}
                width={500}
                height={100}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  margin: "auto",
                }}
                className="rounded-xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="mt-2" dangerouslySetInnerHTML={{ __html: content }} />
        <div>
          <strong>Tags:</strong> {tags?.join(", ")}
        </div>
        <div>
          <strong>Category:</strong> {category}
        </div>
        <div>
          <strong>Upvotes:</strong> {upvotes} | <strong>Downvotes:</strong>
          {downvotes} | <strong>Comments:</strong>
          {allComments?.data.length | 0}
        </div>
        <div className="divider"></div>
        <div className="mb-5">
          <button
            onClick={() => setAddCommentModal(true)}
            className="btn btn-outline btn-info btn-md"
          >
            Add Comment
          </button>
        </div>
        <div>
          {comments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment: TComment) => (
              <div key={comment._id} className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <Image
                      alt="User Avatar"
                      src={comment.userId.avatar}
                      width={50}
                      height={50}
                    />
                  </div>
                </div>
                <div className="chat-bubble relative">
                  <p className="p-4">{comment.userId.name}</p>
                  <p>{comment.comment}</p>

                  <button
                    onClick={() => {
                      setShowModal(true);
                      setCommentId(comment._id);
                      setCommentedUserId(comment.userId._id);
                    }}
                    className="ml-5 absolute top-0 end-2 text-xl font-bold btn btn-sm bg-transparent text-white border-0 hover:bg-transparent"
                  >
                    ...
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {showModal && (
          <dialog id="my_modal_3" className="modal" open>
            <div className="modal-box w-[250px] lg:w-[400px] lg:h-[200px]">
              <form method="dialog">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                  ✕
                </button>
              </form>
              <div className="flex flex-col space-y-4 p-5">
                <button
                  onClick={() => setUpdateCommentModal(true)}
                  className="btn btn-info"
                >
                  Update
                </button>
                <button onClick={handleDeleteComment} className="btn btn-error">
                  Delete
                </button>
              </div>
            </div>
          </dialog>
        )}
        {addCommentModal && (
          <dialog id="my_modal_3" className="modal" open>
            <div className="modal-box w-[280px] lg:w-[500px] lg:h-[270px]">
              <form method="dialog">
                <button
                  onClick={() => setAddCommentModal(false)}
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                  ✕
                </button>
              </form>
              <form action="" onSubmit={handleAddComment}>
                <textarea
                  rows={5}
                  cols={58}
                  className="textarea textarea-bordered"
                  placeholder="Type comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button
                  type="submit"
                  className="btn btn-outline btn-info btn-sm btn-ghost"
                >
                  Add
                </button>
              </form>
            </div>
          </dialog>
        )}
        {updateCommentModal && (
          <dialog id="my_modal_3" className="modal" open>
            <div className="modal-box w-[280px] lg:w-[500px] lg:h-[270px]">
              <form method="dialog">
                <button
                  onClick={() => setUpdateCommentModal(false)}
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                  ✕
                </button>
              </form>
              <form action="" onSubmit={handleUpdateComment}>
                <textarea
                  rows={5}
                  cols={58}
                  className="textarea textarea-bordered"
                  placeholder="Type comment"
                  value={updateComment}
                  onChange={(e) => setUpdateComment(e.target.value)}
                ></textarea>
                <button
                  type="submit"
                  className="btn btn-outline btn-info btn-sm"
                >
                  Update
                </button>
              </form>
            </div>
          </dialog>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PostDetails;
