import express from "express";
import signupController from "./../controllers/signupController.js";
import registerController from "./../controllers/registerController.js";
import resendController from "./../controllers/resendController.js";
import loginController from "./../controllers/loginController.js";
import resetController from "./../controllers/resetController.js";
import logoutController from "./../controllers/logoutController.js";
import updateController from "./../controllers/updateController.js";
import fetchAllFriendsController from "./../controllers/fetchAllFriendsController.js"; //
import inviteFriendController from "./../controllers/inviteFriendController.js";
import removeAccountController from "../controllers/removeAccountController.js";
import resetRequestController from "./../controllers/resetRequestController.js";
import fetchUserController from "./../controllers/fetchUserController.js";
import blacklistMiddleware from "./../middleware/blackListMiddleware.js";
import { lastNameExist, phoneExist } from "./../middleware/existingMiddleware.js";
import verifyPhone from "./../middleware/verifyPhoneMiddleware.js";
import verifyCode from "./../middleware/verifyCodeMiddleware.js";
import sendCodeMiddleware from "./../middleware/sendCodeMiddleware.js";
import checkLimit from "./../middleware/checkLimitMiddleware.js";
import { protectHome } from "./../middleware/authorization.js";

const userRouter = express.Router();

userRouter.use(blacklistMiddleware);

userRouter.route("/").get(protectHome, fetchAllFriendsController);
userRouter.route("/invite").post(protectHome, inviteFriendController);
userRouter.route("/signup").post(phoneExist, lastNameExist, signupController, sendCodeMiddleware);
userRouter.route("/login").post(loginController);
userRouter.route("/remove_account").delete(removeAccountController);
userRouter.route("/logout").get(logoutController);
userRouter.route("/update").patch(protectHome, updateController);
userRouter.route("/verification").post(verifyPhone, verifyCode, registerController);
userRouter.route("/reset").put(resetController);
userRouter.route("/reset_request").post(resetRequestController);
userRouter.route("/resend_verification").post(verifyPhone, checkLimit, resendController);
userRouter.route("/:id").get(protectHome, fetchUserController);

userRouter.use((error, req, res, next) => {
  console.log(error);
  res.status(error.statusCode).json({ status: "fail", statusCode: error.statusCode, message: error.message });
});

export default userRouter;
