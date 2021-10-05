import express from "express";
import signupController from "./../controllers/signupController.js";
import blacklistMiddleware from "./../middleware/blacklistMiddleware.js";
import { lastNameExist, phoneExist } from "./../middleware/existingMiddleware.js";
import sendCodeMiddleware from "./../middleware/sendCodeMiddleware.js";

const userRouter = express.Router();

userRouter.use(blacklistMiddleware);

userRouter.route("/signup").post(phoneExist, lastNameExist, signupController, sendCodeMiddleware);

userRouter.use((error, req, res, next) => {
  console.log(error);
  res.status(error.statusCode).json({ status: "fail", statusCode: error.statusCode, message: error.message });
});

export default userRouter;
