import Errorhandler from "../utils/Errorhandler.js";
import Logger from "../utils/Logger.js";
import { findOne } from "../database/query.js";
import Verification from "../models/Verification.js";

async function verifyCode(req, res, next) {
  try {
    const code = req.body["code"];
    const phone = req.body["phone"];
    const dbCode = req.body["dbCode"];
    let time = req.body["time"];
    const codeMatch = code === dbCode;
    if (codeMatch) {
      time = parseInt(time, 10);
      const currentTime = Date.now();
      const elapsedTime = Math.round((currentTime - time) / 1000);
      if (elapsedTime <= 5) {
        next();
      } else {
        next(new Errorhandler("Verification code expired", 403));
      }
    } else { 
      next(new Errorhandler("Invalid verification code", 403));
    }
  } catch (error) {
    Logger.log("ERROR", error, import.meta.url);
    next(new Errorhandler("An error occurred on our server", 500));
  }
}

export default verifyCode;
