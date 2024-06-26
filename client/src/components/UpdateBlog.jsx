import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBlog = () => {
  const { user } = useAuth0();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/posts/${id}`
        );
        console.log(res);
        const { title, content } = res.data.post;
        setTitle(title);
        setContent(content);
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch blog data");
      }
    };
    fetchBlogData();
  }, [id]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (e.target.value.length > 1000) {
      setTitleError("Title must be 1000 characters or less");
    } else {
      setTitleError("");
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    if (e.target.value.length > 10000) {
      setContentError("Content must be 10000 characters or less");
    } else {
      setContentError("");
    }
  };

  const handleTabKeyPress = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const newValue = `${e.target.value.substring(
        0,
        selectionStart
      )}\t${e.target.value.substring(selectionEnd)}`;
      setContent(newValue);
      e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || titleError || contentError) {
      toast.error("Please fix all errors before submitting.");
      return;
    }
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${id}`,
        {
          title: title,
          content: content,
          author: user.name,
        }
      );
      console.log(res);
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update blog");
    }
  };

  return (
    <div className="w-[50%] text-[#112D4E] mx-auto">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="text-2xl font-semibold text-center my-8">
          <h1>Update Blog</h1>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-bold mb-2">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            className={`border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
              titleError && "border-red-500"
            }`}
          />
          {titleError && (
            <p className="text-red-500 text-xs italic">{titleError}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-lg font-bold mb-2">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            onKeyDown={handleTabKeyPress}
            className={`h-80 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
              contentError && "border-red-500"
            }`}
          />
          {contentError && (
            <p className="text-red-500 text-xs italic">{contentError}</p>
          )}
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
