export type TAuthor = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin" | "moderator";
  avatar: string;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface IPost {
  _id: string;
  title: string;
  content: string;
  author: TAuthor;
  images: string[];
  videos: string[];
  tags: string[];
  category: string;
  upvotes: number;
  downvotes: number;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  voters: string[];
}

export type TVote = {
  vote: 1 | -1;
};
