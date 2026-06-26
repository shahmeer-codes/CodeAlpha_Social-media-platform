
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createComment,
  getComments,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.get("/:postId", getComments);

router.post("/:postId", authMiddleware, createComment);

router.delete("/:id", authMiddleware, deleteComment);

export default router;
