import express from "express";
import signupViewController from "./../controllers/signupViewController.js";
import homeViewController from "./../controllers/homeViewController.js";
import loginViewController from "./../controllers/loginViewController.js"
import verifyViewController from "./../controllers/verifyViewController.js";
import {protectVerification} from "./../middleware/authorization.js";

const viewRouter = express.Router();

viewRouter.route("/signup").get(signupViewController);
viewRouter.route("/login").get(loginViewController);
viewRouter.route("/home").get(homeViewController);
viewRouter.route("/verification").get(protectVerification, verifyViewController);

export default viewRouter;
