import express from "express";
import { protectHome } from "./../middleware/authorization.js";
import blacklistMiddleware from "./../middleware/blackListMiddleware.js";
import fetchAllChatController from "./../controllers/fetchAllChatController.js";

const chatRouter = express.Router();

chatRouter.use(blacklistMiddleware);

chatRouter.route("/:senderId/:recipientId").get(protectHome, fetchAllChatController);

chatRouter.use((error, req, res, next) => {
  console.log(error);
  res.status(error.statusCode).json({ status: "fail", statusCode: error.statusCode, message: error.message });
});

export default chatRouter;
