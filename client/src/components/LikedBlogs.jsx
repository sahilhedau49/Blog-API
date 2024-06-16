import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import BlogCard from "./BlogCard";

const LikedBlogs = () => {
  const { user } = useAuth0();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/posts/likedPost/${user.nickname}`
        );
        setBlogs(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="my-10">
      {blogs.length === 0 ? (
        <div className="py-20">
          <h1 className="text-6xl font-extrabold text-gray-300 text-center">
            You have not liked any blog :{`(`}
          </h1>
        </div>
      ) : (
        <div className="w-[80%] mx-auto">
          <div className="w-full flex justify-between py-3 mb-10 place-items-center">
            <h2 className="text-5xl font-semibold text-[#112D4E] italic">
              Liked Blogs
            </h2>
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

export default LikedBlogs;
