import Errorhandler from "../utils/Errorhandler.js";
import Logger from "./../utils/Logger.js";
import User from "./../models/User.js";
import { findAndUpdate } from "./../database/query.js";

async function updateController(req, res, next) {
  try {
    const data = req.body;
    await findAndUpdate(User, { _id: data["id"] }, data["user_data"]);
    res.status(204).end();
  } catch (error) {
    Logger.log("ERROR", error, import.meta.url);
    next(new Errorhandler("An error occurred on our server", 500));
  }
}

export default updateController;
