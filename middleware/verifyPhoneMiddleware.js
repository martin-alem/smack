import Errorhandler from "../utils/Errorhandler.js";
import Logger from "../utils/Logger.js";
import { findOne } from "../database/query.js";
import Verification from "../models/Verification.js";

async function verifyPhone(req, res, next) {
  try {
    const phone = req.body["phone"];
    const result = await findOne(Verification, { phone: phone });
    if (result && result["status"] === "pending") {
      req.body["dbCode"] = result["code"];
      req.body["time"] = result["date"];
      req.body["vAttempts"] = result["verificationAttempt"];
      next();
    } else {
      next(new Errorhandler("Invalid phone number", 403));
    }
  } catch (error) {
    Logger.log("ERROR", error, import.meta.url);
    next(new Errorhandler("An error occurred on our server", 500));
  }
}

export default verifyPhone;
