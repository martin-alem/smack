import express from "express";
import signupViewController from "./../controllers/signupViewController.js";
import homeViewController from "./../controllers/homeViewController.js";

const viewRouter = express.Router();

viewRouter.route("/signup").get(signupViewController);
viewRouter.route("/home").get(homeViewController);

export default viewRouter;
