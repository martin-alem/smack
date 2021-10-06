import express from "express";
import signupController from "./../controllers/signupController.js";
import registerController from "./../controllers/registerController.js";
import resendController from "./../controllers/resendController.js";
import loginController from "./../controllers/loginController.js";
import resetRequestController from "./../controllers/resetRequestController.js";
import blacklistMiddleware from "./../middleware/blacklistMiddleware.js";
import { lastNameExist, phoneExist } from "./../middleware/existingMiddleware.js";
import verifyPhone from "./../middleware/verifyPhoneMiddleware.js";
import verifyCode from "./../middleware/verifyCodeMiddleware.js";
import sendCodeMiddleware from "./../middleware/sendCodeMiddleware.js";
import checkLimit from "./../middleware/checkLimitMiddleware.js";

const userRouter = express.Router();

userRouter.use(blacklistMiddleware);

userRouter.route("/signup").post(phoneExist, lastNameExist, signupController, sendCodeMiddleware);
userRouter.route("/login").post(loginController);
userRouter.route("/verification").post(verifyPhone, verifyCode, registerController);
userRouter.route("/reset_request").post(resetRequestController);
userRouter.route("/resend_verification").post(verifyPhone, checkLimit, resendController);

userRouter.use((error, req, res, next) => {
  console.log(error);
  res.status(error.statusCode).json({ status: "fail", statusCode: error.statusCode, message: error.message });
});

export default userRouter;
