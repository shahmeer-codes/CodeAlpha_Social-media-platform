import Message from "../models/Message.js";
import User from "../models/User.js";

// Get conversations list (latest message for each user)
export const getConversations = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find all messages where user is sender or receiver
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .sort({ createdAt: -1 })
      .populate("sender", "username avatar")
      .populate("receiver", "username avatar");

    // Group by conversation partner
    const conversationsMap = new Map();
    
    messages.forEach((msg) => {
      const partnerId = msg.sender._id.toString() === userId.toString() 
        ? msg.receiver._id.toString() 
        : msg.sender._id.toString();
        
      if (!conversationsMap.has(partnerId)) {
        conversationsMap.set(partnerId, {
          partner: msg.sender._id.toString() === userId.toString() ? msg.receiver : msg.sender,
          lastMessage: msg,
          unreadCount: (msg.receiver._id.toString() === userId.toString() && !msg.read) ? 1 : 0
        });
      } else {
        const conv = conversationsMap.get(partnerId);
        if (msg.receiver._id.toString() === userId.toString() && !msg.read) {
          conv.unreadCount += 1;
        }
      }
    });

    const conversations = Array.from(conversationsMap.values());

    res.status(200).json({
      success: true,
      conversations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get messages for a specific conversation
export const getMessages = async (req, res) => {
  try {
    const { userId: partnerId } = req.params;
    const userId = req.user._id;

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: partnerId },
        { sender: partnerId, receiver: userId },
      ],
    }).sort({ createdAt: 1 });

    // Mark messages as read
    await Message.updateMany(
      { sender: partnerId, receiver: userId, read: false },
      { $set: { read: true } }
    );

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Send a message
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.user._id;

    if (!content || !receiverId) {
      return res.status(400).json({
        success: false,
        message: "Receiver and content are required",
      });
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "Receiver not found",
      });
    }

    const message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      content,
    });

    await message.populate("sender", "username avatar");
    await message.populate("receiver", "username avatar");

    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
