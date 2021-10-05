import Errorhandler from "./../utils/Errorhandler.js";
import BlackList from "./../models/BlackList.js";
import { insertOne } from "./../database/query.js";

function alreadyExist(req, res, next) {
  const status = req["regStatus"];
  const regAttempt = req["regAttempt"];

  if (status === "registered") {
    if (regAttempt > 5) {
      //blacklist the user here
      const data = { ipAddress: req.ip, reason: "Trying to abuse api" };
      insertOne(BlackList, data);
      next(new Errorhandler("This user has been blacklisted", 403));
    } else {
      next();
    }
  } else if (status === "active") {
    next(new Errorhandler("This user has an active account", 403));
  }
}

export default alreadyExist;
