import Errorhandler from "../utils/Errorhandler.js";
import Logger from "./../utils/Logger.js";
import LoginUser from "./../models/Login.js";
import { findAndUpdate, findOne } from "./../database/query.js";
import { hashData } from "./../utils/utils.js";

async function resetController(req, res, next) {
  try {
    const password = req.body["password"];
    const phone = req.query.phone;
    const duration = parseInt(req.query.duration, 10);
    const currentTime = Date.now();
    const elapsedTime = Math.round((currentTime - duration) / 3.6e6);

    if (elapsedTime > 24) {
      next(new Errorhandler("Reset link expired. Request another one."));
    } else {
      const result = await findOne(LoginUser, { phone: phone });
      if (result && result["status"] === "inactive") {
        const newPassword = hashData(password);
        await findAndUpdate(LoginUser, { phone: phone }, { password: newPassword, status: "active" });
        res.redirect(303, "/view/login");
      } else {
        next(new Errorhandler("Unable to reset your password", 403));
      }
    }
  } catch (error) {
    Logger.log("ERROR", error, import.meta.url);
    next(new Errorhandler("An error occurred on our server", 500));
  }
}

export default resetController;
