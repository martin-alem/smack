import Errorhandler from "../utils/Errorhandler.js";
import Logger from "./../utils/Logger.js";
import User from "./../models/User.js";
import SendSMS from "../services/sendSMS.js";
import { findOne } from "./../database/query.js";

async function inviteFriendController(req, res, next) {
  try {
    const id = req.cookies["_user_token"] || "";
    const recipientPhone = req.body["phone"];
    const message = req.body["message"];
    const sender = await findOne(User, { _id: id });
    if (sender && sender["status"] == "active") {
      const msg = `${sender["firstName"]} ${sender["lastName"]} is inviting you to join smack: [ ${message} ]`;
      const result = await SendSMS.send(recipientPhone, msg);
      if (result["status"] === "fail") {
        Logger.log("ERROR", "Unable to send verification code", import.meta.url);
        next(new Errorhandler("Unable to send verification code", 500));
      } else {
        res.status(200).json({ status: "success", message: "Invitation successfully sent" });
      }
    } else {
      next(new Errorhandler("Unauthorized action", 401));
    }
  } catch (error) {
    Logger.log("ERROR", error, import.meta.url);
    next(new Errorhandler("An error occurred on our server", 500));
  }
}

export default inviteFriendController;
