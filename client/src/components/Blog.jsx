import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { MdDelete } from "react-icons/md";
import BlogOwnerControls from "./BlogOwnerControls";
import { IoArrowBack } from "react-icons/io5";

const Blog = () => {
  const { user, isAuthenticated } = useAuth0();
  const { id } = useParams();
  const [blog, setBlog] = useState();
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/posts/${id}`
        );
        setBlog(res.data[0]);
        console.log(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/posts/${id}/comments`
        );
        setComments(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlogs();
    fetchComments();
  }, [id]);

  const [newComment, setNewComment] = useState("");

  const handleComment = (e) => {
    setNewComment(e.target.value);
  };

  const submitComment = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${id}/comments`,
        { author: user.name, content: newComment }
      );
      console.log(res);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCommentDelete = async (cid) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${id}/comments/${cid}`
      );
      console.log(res);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    blog && (
      <div className="w-[50%] mx-auto my-20">
        <div>
          <div className="flex justify-between place-items-center mb-6">
            <h1 className="text-4xl w-[75%]">{blog.title}</h1>
            <p className="text-lg font-medium text-gray-700">
              - by {blog.author}
            </p>
          </div>
          <hr />
          <div className="my-6 overflow-hidden">
            <p className="whitespace-pre-wrap text-justify text-xl">
              {blog.content}
            </p>
          </div>
          <hr />
          <p className="text-right text-sm mt-6 font-medium text-gray-700">
            {blog.created_at.split("T")[0]}
          </p>
        </div>
        <div className="mt-20">
          <div>
            <div className="mb-6">
              <p className="text-xl">Comments</p>
            </div>
            <div className="flex justify-between mb-10">
              <input
                className="w-[70%] bg-[#DBE2EF] px-6 py-2 rounded-xl border-b-2 focus:outline-none disabled:cursor-not-allowed"
                disabled={!isAuthenticated}
                type="text"
                placeholder={`${
                  isAuthenticated ? "Add your comment" : "Sign in to comment"
                }`}
                onChange={handleComment}
              />
              <button
                onClick={submitComment}
                disabled={newComment.trim() === ""}
                className={`duration-300 hover:text-zinc-50 hover:bg-[#3F72AF] hover:border-[#3F72AF] px-4 py-1 h-fit border-2 rounded-xl border-zinc-500 text-zinc-800 disabled:cursor-not-allowed disabled:text-zinc-400 disabled:border-zinc-300`}
              >
                Add comment
              </button>
            </div>
            {comments.length === 0 ? (
              <p className="text-center text-xl text-gray-500">No comments</p>
            ) : (
              <div className="flex flex-col gap-4">
                {comments.map((comment) => (
                  <div key={comment.id}>
                    <div className="flex justify-between">
                      <p className="text-sm font-semibold">{comment.author}</p>
                      <p className="text-xs font-medium">
                        {comment.created_at.split("T")[0]}
                      </p>
                    </div>
                    <div className="flex justify-between mt-1">
                      <p className="text-base mb-3">{comment.content}</p>
                      {user?.name === comment.author && (
                        <button
                          onClick={() => handleCommentDelete(comment.id)}
                          className="text-xl text-red-600"
                        >
                          <MdDelete />
                        </button>
                      )}
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {user?.name === blog.author && (
          <div>
            <BlogOwnerControls id={id} />
          </div>
        )}
        <div
          className="text-4xl absolute top-28 left-8 text-zinc-50 bg-[#112D4E] rounded-full p-2 cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        >
          <IoArrowBack className="active:-translate-x-1 duration-500" />
        </div>
      </div>
    )
  );
};

export default Blog;
