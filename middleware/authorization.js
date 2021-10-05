import Errorhandler from "./../utils/Errorhandler.js";
import Logger from "./../utils/Logger.js";
import Verification from "./../models/Verification.js";
import { findOne } from "./../database/query.js";

async function protectVerification(req, res, next) {
  try {
    if (Object.keys(req.cookies).length > 0) {
      let phone = req.cookies["_user_phone"] || "";
      const result = await findOne(Verification, { phone: phone });
      if (!result || (result && result["status"] === "verified")) {
        res.redirect(301, "/view/signup");
      } else {
        next();
      }
    }
  } catch (error) {
    Logger.log("ERROR", error, import.meta.url);
    next(new Errorhandler("An error has occurred on our server", 500));
  }
}

export { protectVerification };
