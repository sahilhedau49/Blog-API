import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

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

  return (
    <div className="my-20">
      <div className="grid grid-cols-3 w-[80%] gap-10 mx-auto">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} data={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
