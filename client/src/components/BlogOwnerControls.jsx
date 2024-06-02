import axios from "axios";
import React from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const BlogOwnerControls = ({ id }) => {
  const navigate = useNavigate();

  const handleBlogDelete = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${id}`
      );
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed flex flex-col gap-6 text-4xl bottom-6 right-6">
      <Link
        className="cursor-pointer rounded-full bg-purple-200 p-3 duration-200 hover:bg-purple-300"
        to={`/post/${id}/update`}
      >
        <MdEdit />
      </Link>
      <div
        className="cursor-pointer rounded-full bg-red-200 p-3 duration-200 hover:bg-red-300"
        onClick={handleBlogDelete}
      >
        <MdDelete />
      </div>
    </div>
  );
};

export default BlogOwnerControls;
