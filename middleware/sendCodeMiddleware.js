import SendSMS from "./../services/sendSMS.js";
import Errorhandler from "./../utils/Errorhandler.js";
import Logger from "./../utils/Logger.js";

async function sendVerification(req, res, next) {
  try {
    const phone = req.body["phone"];
    const code = req.body["code"];
    const message = `Your smack verification code is ${code}. valid for 5 minutes`;
    const result = await SendSMS.send(phone, message);
    if (result["status"] === "fail") {
      Logger.log("ERROR", "Unable to send verification code", import.meta.url);
      next(new Errorhandler("Unable to send verification code", 500));
    } else {
      res.cookie("_user_phone", phone, { sameSite: true });
      res.redirect(301, "/view/verification");
    }
  } catch (error) {
    Logger.log("ERROR", error, import.meta.url);
    next(new Errorhandler("An error occurred on our server", 500));
  }
}

export default sendVerification;
