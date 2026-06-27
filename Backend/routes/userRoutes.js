import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  getUserProfile,
  toggleFollow,
  updateProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.put("/settings", authMiddleware, upload.single("avatar"), updateProfile);
router.get("/:id", authMiddleware, getUserProfile);
router.put("/:id/follow", authMiddleware, toggleFollow);

export default router;
