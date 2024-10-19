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