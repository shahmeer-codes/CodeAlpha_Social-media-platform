import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getConversations, getMessages, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.get("/conversations", authMiddleware, getConversations);
router.get("/:userId", authMiddleware, getMessages);
router.post("/", authMiddleware, sendMessage);

export default router;
