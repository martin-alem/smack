import express from "express";
import signupViewController from "./../controllers/signupViewController.js";
import homeViewController from "./../controllers/homeViewController.js";
import loginViewController from "./../controllers/loginViewController.js";
import verifyViewController from "./../controllers/verifyViewController.js";
import resetViewController from "./../controllers/resetViewController.js";
import { protectVerification, protectHome } from "./../middleware/authorization.js";
import resetRequestViewController from "./../controllers/resetRequestViewController.js";

const viewRouter = express.Router();

viewRouter.route("/").get(protectHome, homeViewController);
viewRouter.route("/signup").get(signupViewController);
viewRouter.route("/login").get(loginViewController);
viewRouter.route("/verification").get(protectVerification, verifyViewController);
viewRouter.route("/reset_request").get(resetRequestViewController);
viewRouter.route("/reset").get(resetViewController);

export default viewRouter;
