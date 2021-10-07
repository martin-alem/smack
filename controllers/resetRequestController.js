import Errorhandler from "../utils/Errorhandler.js";
import Logger from "./../utils/Logger.js";
import LoginUser from "./../models/Login.js";
import User from "./../models/User.js";
import { findOne, findAndUpdate } from "./../database/query.js";
import sendEmail from "./../services/sendEmail.js";

async function resetRequestController(req, res, next) {
  try {
    const phone = req.body["phone"];
    const result = await findOne(LoginUser, { phone: phone });
    if (result && result["status"] !== "blocked") {
      const user = await findOne(User, { phone: phone });
      await findAndUpdate(LoginUser, { phone: phone }, { status: "inactive" });
      const time = Date.now().toString();
      const resetUrl = `https://smacku.herokuapp.com/reset?phone=${phone}&duration=${time}`;
      await sendEmail.sendEmail({ templateName: "reset", address: user["email"], subject: "Password Reset Request", url: resetUrl });
      res.status(201).json({ status: "success", message: "Reset link sent. Please check your email" });
    } else {
      next(new Errorhandler("Sorry! but cannot find account", 403));
    }
  } catch (error) {
    Logger.log("ERROR", error, import.meta.url);
    next(new Errorhandler("An error occurred on our server", 500));
  }
}

export default resetRequestController;
