import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.ObjectId,
    required: true,
  },
  recipientId: {
    type: mongoose.ObjectId,
    required: true,
  },
  messageType: {
    type: String,
    required: true,
  },
  messageBody: {
    type: String,
    required: true,
  },
  attachments: {
    type: [mongoose.ObjectId],
    required: false,
  },
  senderDelete: {
    type: Boolean,
    required: false,
    default: false,
  },
  recipientDelete: {
    type: Boolean,
    required: false,
    default: false,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Chat = mongoose.model("Chat", ChatSchema);

export default Chat;
