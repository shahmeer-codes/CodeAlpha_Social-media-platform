import express from "express";
import {
  createPost,
  getPosts,
  likeUnlikePost,
  deletePost,
} from "../controllers/postController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getPosts);

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createPost
);

router.put(
  "/:id/like",
  authMiddleware,
  likeUnlikePost
);

router.delete(
  "/:id",
  authMiddleware,
  deletePost
);

export default router;
