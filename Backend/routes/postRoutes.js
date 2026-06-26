import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  createPost,
  getPosts,
  toggleLike,
  deletePost,
} from "../controllers/postController.js";

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
  toggleLike
);

router.delete(
  "/:id",
  authMiddleware,
  deletePost
);

export default router;
