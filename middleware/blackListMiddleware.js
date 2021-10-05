import Errorhandler from "./../utils/Errorhandler.js";
import BlackList from "./../models/BlackList.js";
import { findOne } from "../database/query.js";

function blacklistMiddleware(req, res, next) {
  const ip = req.ip;
  const result = findOne(BlackList, "ipAddress", ip);
  if (!result) {
    next();
  } else {
    next(new Errorhandler("Ip address blacklisted", 403));
  }
}

export default blacklistMiddleware;
