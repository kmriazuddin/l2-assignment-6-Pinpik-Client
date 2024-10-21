import { TAuthor } from "./post.type";

export type TComment = {
  _id: string;
  postId: string;
  userId: TAuthor;
  comment: string;
  replies: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TTableUser = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar: string;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
