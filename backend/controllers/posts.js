const db = require("../db");

const getAllPosts = (req, res) => {
  const q = "SELECT * FROM posts ORDER BY created_at DESC";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

const getAllPostsByTitle = (req, res) => {
  const { title } = req.params;
  const q =
    "SELECT * FROM posts WHERE title LIKE CONCAT('%', ?, '%') ORDER BY created_at DESC";

  db.query(q, [title], (err, data) => {
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

  const postQuery = "SELECT * FROM posts WHERE id = ?";
  const likesCountQuery =
    "SELECT COUNT(*) AS likesCount FROM likes WHERE post_id = ?";

  db.query(postQuery, [id], (err, postData) => {
    if (err) return res.json(err);

    if (postData.length === 0) {
      return res.json({ message: "Post not found" });
    }

    db.query(likesCountQuery, [id], (err, likesCountData) => {
      if (err) return res.json(err);

      const likesCount = likesCountData[0].likesCount;

      return res.json({
        post: postData[0],
        likesCount: likesCount,
      });
    });
  });
};

const checkUserLikedPostById = (req, res) => {
  const { id, username } = req.params;

  const userLikedQuery =
    "SELECT COUNT(*) AS userLiked FROM likes WHERE post_id = ? AND username = ?";

  db.query(userLikedQuery, [id, username], (err, userLikedData) => {
    if (err) return res.json(err);

    const userLiked = userLikedData[0].userLiked > 0;

    return res.json({
      userLiked: userLiked,
    });
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
  getAllPostsByTitle,
  getPostById,
  createOnePost,
  updatePostById,
  deleteOnePost,
  checkUserLikedPostById,
};
