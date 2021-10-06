import Errorhandler from "../utils/Errorhandler.js";
import Logger from "./../utils/Logger.js";
import User from "./../models/User.js";
import { findOne } from "./../database/query.js";

async function homeViewController(req, res, next) {
  try {
    const id = req.cookies["_user_token"];
    const user = await findOne(User, { _id: id });
    res.status(200).render("home", { user: user });
  } catch (error) {
    Logger.log("ERROR", error, import.meta.url);
    next(new Errorhandler("An error occurred on our server", 500));
  }
}

export default homeViewController;
