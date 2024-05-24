const db = require("../db");

const getAllPosts = (req, res) => {
  const q = "SELECT * FROM posts";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

const createOnePost = (req, res) => {
  const q = "INSERT INTO posts (`title`, `content`, `author`) VALUES (?)";
  const values = [req.body.title, req.body.content, req.body.author];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json({
      message: "Post created successfully",
      data: data,
    });
  });
};

const getPostById = (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM posts WHERE id = (?)";

  db.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    if (data.length == 0) return res.json("Invalid Post ID");
    return res.json(data);
  });
};

const updatePostById = (req, res) => {
  const { id } = req.params;
  const q =
    "UPDATE posts SET `title` = ?, `content` = ?, `author` = ? WHERE id = ?";
  const values = [req.body.title, req.body.content, req.body.author];

  db.query(q, [...values, id], (err, data) => {
    if (err) return res.json(err);
    if (data.affectedRows == 0) return res.json("Invalid Post ID");
    return res.json({
      message: "Post updated successfully",
      data: data,
    });
  });
};

const deleteOnePost = (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM posts WHERE id = ?";

  db.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    if (data.affectedRows == 0) return res.json("Invalid Post ID");
    return res.json({
      message: "Post deleted successfully",
      data: data,
    });
  });
};

module.exports = {
  getAllPosts,
  getPostById,
  createOnePost,
  updatePostById,
  deleteOnePost,
};
