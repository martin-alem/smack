import Errorhandler from "../utils/Errorhandler.js";
import Logger from "./../utils/Logger.js";
import LoginUser from "./../models/Login.js";
import { findOne, findAndUpdate } from "./../database/query.js";
import { hashData, signCookie } from "./../utils/utils.js";

async function loginController(req, res, next) {
  try {
    const phone = req.body["phone"];
    const password = req.body["password"];
    const result = await findOne(LoginUser, { phone: phone });

    if (result && result["status"] === "active") {
      let loginAttempts = result["loginAttempts"];
      if (loginAttempts > 5) {
        //change use status to blocked
        await findAndUpdate(LoginUser, { phone: phone }, { status: "blocked" });
        //send email
        next(new Errorhandler("This account is blocked. Check your email", 403));
      } else {
        if (hashData(password) === result["password"]) {
          await findAndUpdate(LoginUser, { phone: phone }, { loginAttempts: 0 });
          //send cookies
          const userToken = result["userId"].toString("hex");
          const userSUID = signCookie(userToken);
          res.cookie("_user_uid", userSUID, { expires: new Date(Date.now() + 1 * 3600000), sameSite: true });
          res.cookie("_user_token", userToken, { expires: new Date(Date.now() + 1 * 3600000), sameSite: true });
          res.redirect(301, "/view/home");
        } else {
          await findAndUpdate(LoginUser, { phone: phone }, { loginAttempts: loginAttempts + 1 });
          next(new Errorhandler("Invalid phone or password", 403));
        }
      }
    } else {
      next(new Errorhandler("No account exist with the provided credentials", 403));
    }
  } catch (error) {
    Logger.log("ERROR", error, import.meta.url);
    next(new Errorhandler("An error has occurred on our server", 500));
  }
}

export default loginController;
