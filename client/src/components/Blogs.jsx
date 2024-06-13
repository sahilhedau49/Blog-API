import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";
import ReactLoading from "react-loading";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/posts`
        );
        setBlogs(res.data);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
  }, []);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSearch = async () => {
    try {
      if (title === "") {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/posts`
        );
        setBlogs(res.data);
      } else {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/posts/byTitle/${title}`
        );
        setBlogs(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="my-10">
      {blogs.length === 0 ? (
        <div className="py-20">
          <ReactLoading
            className="mx-auto"
            type={"spin"}
            color={"#888"}
            height={"6%"}
            width={"6%"}
          />
        </div>
      ) : (
        <div className="w-[80%] mx-auto">
          <div className="w-full flex justify-between py-3 mb-10 place-items-center">
            <h2 className="text-5xl font-semibold text-[#112D4E] italic">
              Latest Blogs
            </h2>
            <div className="flex gap-3">
              <input
                type="text"
                name="title"
                placeholder="Blog Title"
                id="title"
                onChange={handleChangeTitle}
                className="border-2 border-[#112D4E] py-2 px-6 rounded-full outline-none"
              />
              <button
                className="px-6 py-2 rounded-full text-gray-50 bg-[#112D4E] duration-200 hover:shadow-lg hover:shadow-[#3F72AF]/50"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-10">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} data={blog} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
