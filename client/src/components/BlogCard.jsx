import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ data }) => {
  return (
    <Link
      to={`/post/${data.id}`}
      className="flex flex-col justify-between bg-zinc-300 p-8 duration-100 hover:scale-105"
    >
      <div>
        <div className="text-xl font-medium mb-4">{data.title}</div>
        <div className="text-base">{data.content.substr(0, 120)} ...</div>
      </div>
      <div className="mt-6 text-right">
        <p className="text-sm font-semibold">
          {Date(data.created_at).toLocaleString().split(" GMT")[0]}
        </p>
        <p className="text-sm font-semibold"> - {data.author}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
