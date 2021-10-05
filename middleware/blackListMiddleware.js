import Errorhandler from "./../utils/Errorhandler.js";
import BlackList from "./../models/BlackList.js";
import { findOne } from "../database/query.js";

async function blacklistMiddleware(req, res, next) {
  const ip = req.ip;
  const result = await findOne(BlackList, { ipAddress: ip });
  if (!result) {
    next();
  } else {
    next(new Errorhandler("IP address blacklisted", 403));
  }
}

export default blacklistMiddleware;
