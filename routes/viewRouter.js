import express from "express";
import signupViewController from "./../controllers/signupViewController.js";
import homeViewController from "./../controllers/homeViewController.js";
import verifyViewController from "./../controllers/verifyViewController.js";

const viewRouter = express.Router();

viewRouter.route("/signup").get(signupViewController);
viewRouter.route("/home").get(homeViewController);
viewRouter.route("/verification").get(verifyViewController);

export default viewRouter;
