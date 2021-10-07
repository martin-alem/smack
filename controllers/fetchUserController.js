import Errorhandler from "../utils/Errorhandler.js";
import Logger from "../utils/Logger.js";
import User from "../models/User.js";
import { findOne } from "../database/query.js";

async function fetchAllFriendsController(req, res, next) {
  try {
    const id = req.params.id;
    const result = await findOne(User, { _id: id });
    res.status(200).json({ friend: result });
  } catch (error) {
    Logger.log("Error", error, import.meta.url);
    next(new Errorhandler("An error occurred on our server", 500));
  }
}

export default fetchAllFriendsController;
