import Errorhandler from "../utils/Errorhandler.js";
import Logger from "../utils/Logger.js";
import User from "../models/User.js";
import { findAll } from "../database/query.js";

async function fetchAllFriendsController(req, res, next) {
  try {
    const result = await findAll(User);
    res.status(200).json({ total: result.length, friends: result });
  } catch (error) {
    Logger.log("Error", error, import.meta.url);
    next(new Errorhandler("An error occurred on our server", 500));
  }
}

export default fetchAllFriendsController;
