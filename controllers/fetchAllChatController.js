import Errorhandler from "../utils/Errorhandler.js";
import Logger from "../utils/Logger.js";
import Chat from "../models/Chat.js";
import { findAllWithFilter } from "../database/query.js";

async function fetchAllChatController(req, res, next) {
  try {
    const senderId = req.params.senderId;
    const recipientId = req.params.recipientId;
    const result = await findAllWithFilter(Chat, [{ senderId: senderId, recipientId: recipientId }, { senderId: recipientId, recipientId: senderId }]);
    res.status(200).json({ total: result.length, chats: result });
  } catch (error) {
    Logger.log("Error", error, import.meta.url);
    next(new Errorhandler("An error occurred on our server", 500));
  }
}

export default fetchAllChatController;
