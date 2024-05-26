const db = require("../db");

const createOneComment = (req, res) => {
  const { post_id } = req.params;
  const q = "INSERT INTO comments (post_id, content, author) VALUES (?)";
  const values = [post_id, req.body.content, req.body.author];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json({
      message: "Comment added successfully",
      data: data,
    });
  });
};

const getAllCommentOfPostById = (req, res) => {
  const { post_id } = req.params;
  const q =
    "SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC;";

  db.query(q, [post_id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

const deleteCommentById = (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM comments WHERE id = ?";

  db.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json({
      message: "Comment deleted successfully",
      data: data,
    });
  });
};

module.exports = {
  createOneComment,
  getAllCommentOfPostById,
  deleteCommentById,
};
