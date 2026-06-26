import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getUserProfile,
  toggleFollow,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", authMiddleware, getUserProfile);

router.put("/:id/follow", authMiddleware, toggleFollow);

export default router;
