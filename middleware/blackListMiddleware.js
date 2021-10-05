import Errorhandler from "./../utils/Errorhandler.js";
import Logger from "./../utils/Logger.js";
import BlackList from "./../models/BlackList.js";
import { findOne } from "../database/query.js";

async function blacklistMiddleware(req, res, next) {
  const ip = req.ip;
  try {
    const result = await findOne(BlackList, { ipAddress: ip });
    if (!result) {
      next();
    } else {
      next(new Errorhandler("IP address blacklisted", 403));
    }
  } catch (error) {
    Logger.log("ERROR", error, import.meta.url);
    next(new Errorhandler("An error occurred on our server", 500));
  }
}

export default blacklistMiddleware;
