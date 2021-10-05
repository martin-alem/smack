import Errorhandler from "../utils/Errorhandler.js";
import Logger from "../utils/Logger.js";

async function checkResendLimit(req, res, next) {
  try {
    const attempts = req.body["vAttempts"];
    if (attempts > 5) {
      next(new Errorhandler("Resend limit exceeded", 403));
    } else {
      next();
    }
  } catch (error) {
    Logger.log("ERROR", error, import.meta.url);
    next(new Errorhandler("An error occurred on our server", 500));
  }
}

export default checkResendLimit;
