import { useGetAllPostQuery } from "@/redux/features/posts/posts.api";
import { IoIosAddCircleOutline } from "react-icons/io";
import Link from "next/link";

const AddPost = () => {
  const { isLoading } = useGetAllPostQuery(undefined);
  return (
    <div>
      <div className="bg-white">{"."}</div>
      <div className="max-w-[810px] mx-auto mt-24">
        {isLoading ? (
          ""
        ) : (
          <Link href="/addPost">
            <button className="btn w-full btn-info text-white text-lg">Add Posts <IoIosAddCircleOutline className="text-xl" /></button>{" "}
          </Link>
        )}
      </div>
    </div>
  );
};

export default AddPost;
