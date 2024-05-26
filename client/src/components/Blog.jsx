import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { MdDelete } from "react-icons/md";

const Blog = () => {
  const { user } = useAuth0();
  const { id } = useParams();
  const [blog, setBlog] = useState();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/posts/${id}`);
        setBlog(res.data[0]);
        console.log(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/posts/${id}/comments`
        );
        setComments(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlogs();
    fetchComments();
  }, []);

  const [newComment, setNewComment] = useState("");

  const handleComment = (e) => {
    setNewComment(e.target.value);
  };

  const submitComment = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/posts/${id}/comments`,
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
        `http://localhost:8000/posts/${id}/comments/${cid}`
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
          <div className="flex justify-between place-items-center">
            <h1 className="text-4xl mb-4">{blog.title}</h1>
            <p className="text-lg font-medium text-gray-700">{blog.author}</p>
          </div>
          <div className="my-6 overflow-hidden">
            <p className="whitespace-pre-wrap text-justify text-xl">
              {blog.content}
            </p>
          </div>
          <p className="text-right text-sm font-medium text-gray-700">
            {Date(blog.created_at).toLocaleString().split(" GMT")[0]}
          </p>
        </div>
        <div className="mt-20">
          <div>
            <div className="mb-6">
              <p className="text-xl">Comments</p>
            </div>
            <div className="flex justify-between mb-10">
              <input
                className="w-[60%] px-4 py-1 border-b-2 focus:outline-none"
                type="text"
                placeholder="Add your comment"
                onChange={handleComment}
              />
              <button
                onClick={submitComment}
                disabled={newComment.trim() === ""}
                className={`px-4 py-1 h-fit border-2 rounded-xl border-zinc-500 text-zinc-800 disabled:cursor-not-allowed disabled:text-zinc-400 disabled:border-zinc-300`}
              >
                Add comment
              </button>
            </div>
            {comments.length == 0 ? (
              <p className="text-center text-xl text-gray-500">No comments</p>
            ) : (
              <div className="flex flex-col gap-4">
                {comments.map((comment) => (
                  <div key={comment.id}>
                    <div className="flex justify-between">
                      <p className="text-sm font-semibold">{comment.author}</p>
                      <p className="text-xs font-medium">
                        {
                          Date(comment.created_at)
                            .toLocaleString()
                            .split(" GMT")[0]
                        }
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
      </div>
    )
  );
};

export default Blog;
