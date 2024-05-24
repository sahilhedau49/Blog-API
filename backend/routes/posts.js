const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  getPostById,
  createOnePost,
  updatePostById,
  deleteOnePost,
} = require("../controllers/posts");

const {
  getAllCommentOfPostById,
  createOneComment,
  deleteCommentById,
} = require("../controllers/comments");

router.route("/").get(getAllPosts);
router.route("/:id").get(getPostById);
router.route("/:id").put(updatePostById);
router.route("/").post(createOnePost);
router.route("/:id").delete(deleteOnePost);

router.route("/:post_id/comments").get(getAllCommentOfPostById);
router.route("/:post_id/comments").post(createOneComment);
router.route("/:post_id/comments/:id").delete(deleteCommentById);

module.exports = router;
