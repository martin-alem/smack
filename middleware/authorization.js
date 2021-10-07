import Errorhandler from "./../utils/Errorhandler.js";
import Logger from "./../utils/Logger.js";
import Verification from "./../models/Verification.js";
import { findOne } from "./../database/query.js";
import { verifyCookie } from "./../utils/utils.js";

async function protectVerification(req, res, next) {
  try {
    if (Object.keys(req.cookies).length > 0) {
      let phone = req.cookies["_user_phone"] || "";
      const result = await findOne(Verification, { phone: phone });
      if (!result || (result && result["status"] === "verified")) {
        res.redirect(303, "/signup");
      } else {
        next();
      }
    } else {
      res.redirect(303, "/signup");
    }
  } catch (error) {
    Logger.log("ERROR", error, import.meta.url);
    next(new Errorhandler("An error has occurred on our server", 500));
  }
}

function protectHome(req, res, next) {
  try {
    if (Object.keys(req.cookies).length > 0) {
      let signedCookie = req.cookies["_user_uid"]?.["data"] || req.cookies?.["_user_uid"] || "";
      let token = req.cookies["_user_token"] || "";
      signedCookie = Buffer.from(signedCookie);
      const authenticated = verifyCookie(token, signedCookie);

      if (authenticated) {
        next();
      } else {
        res.redirect(303, "/login");
      }
    } else {
      res.redirect(303, "/login");
    }
  } catch (error) {
    Logger.log("ERROR", error, import.meta.url);
    next(new Errorhandler("An error has occurred on our server", 500));
  }
}

export { protectVerification, protectHome };
