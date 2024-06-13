const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  getAllPostsByTitle,
  getPostById,
  createOnePost,
  updatePostById,
  deleteOnePost,
  checkUserLikedPostById,
} = require("../controllers/posts");

const {
  getAllCommentOfPostById,
  createOneComment,
  deleteCommentById,
} = require("../controllers/comments");

const { likePostByID, dislikePostByID } = require("../controllers/likes");

router.route("/").get(getAllPosts);
router.route("/byTitle/:title").get(getAllPostsByTitle);
router.route("/:id").get(getPostById);
router.route("/checkUserLiked/:id/:username").get(checkUserLikedPostById);
router.route("/:id").put(updatePostById);
router.route("/").post(createOnePost);
router.route("/:id").delete(deleteOnePost);

router.route("/:post_id/comments").get(getAllCommentOfPostById);
router.route("/:post_id/comments").post(createOneComment);
router.route("/:post_id/comments/:id").delete(deleteCommentById);

router.route("/:post_id/like/:username").post(likePostByID);
router.route("/:post_id/like/:username").delete(dislikePostByID);

module.exports = router;
