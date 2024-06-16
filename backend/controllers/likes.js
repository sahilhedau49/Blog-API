const db = require("../db");

const likePostByID = (req, res) => {
  const { post_id, username } = req.params;

  const q = "INSERT INTO likes (`post_id`, `username`) VALUES (?)";
  const values = [post_id, username];

  const q_to_find = "SELECT * FROM likes WHERE username = ? AND post_id = ?";

  db.query(q_to_find, [username, post_id], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) {
      db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json({
          message: "Liked successfully",
          data: data,
        });
      });
    } else {
      res.json({
        message: "Liked by user already...",
      });
    }
  });
};

const dislikePostByID = (req, res) => {
  const { post_id, username } = req.params;
  const q = "DELETE FROM likes WHERE post_id = ? and username = ?";

  db.query(q, [post_id, username], (err, data) => {
    if (err) return res.json(err);
    return res.json({
      message: "Disliked successfully",
      data: data,
    });
  });
};

const getAllLikedPostByUsername = (req, res) => {
  const { username } = req.params;
  const q =
    "SELECT * FROM posts as p, likes as l WHERE p.id = l.post_id and l.username = ?";

  db.query(q, [username], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

module.exports = { likePostByID, dislikePostByID, getAllLikedPostByUsername };
