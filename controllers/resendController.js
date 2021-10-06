import Verification from "./../models/Verification.js";
import SendSMS from "./../services/sendSMS.js";
import { findAndUpdate } from "./../database/query.js";
import Errorhandler from "./../utils/Errorhandler.js";
import Logger from "./../utils/Logger.js";
import { getCode } from "./../utils/utils.js";

async function resendVerification(req, res, next) {
  try {
    const phone = req.body["phone"];
    const attempts = req.body["vAttempts"];
    const code = getCode(6);
    const message = `Your smack verification code is ${code}. valid for 5 minutes`;
    const result = await SendSMS.send(phone, message);
    if (result["status"] === "fail") {
      Logger.log("ERROR", "Unable to send verification code", import.meta.url);
      next(new Errorhandler("Unable to send verification code", 500));
    } else {
      await findAndUpdate(Verification, { phone: phone }, { verificationAttempt: attempts + 1, code: code, date: Date.now().toString() });
      res.status(201).json({ status: "success", message: "Verification code sent successfully" });
    }
  } catch (error) {
    Logger.log("ERROR", error, import.meta.url);
    next(new Errorhandler("An error occurred on our server", 500));
  }
}

export default resendVerification;
