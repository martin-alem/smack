import express from "express";
import signupController from "./../controllers/signupController.js";
import blacklistMiddleware from "./../middleware/blacklistMiddleware.js";

const userRouter = express.Router();

userRouter.use(blacklistMiddleware);

userRouter.route("/signup").post(signupController);

userRouter.use((error, req, res, next) => {
  res.status(error.statusCode).json({ status: "fail", statusCode: error.statusCode, message: error.message });
});

export default userRouter;
