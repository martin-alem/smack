import express from "express";
import signupController from "./../controllers/signupController.js";

const userRouter = express.Router();

userRouter.route("/signup").post(signupController);

export default userRouter;
