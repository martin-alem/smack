import Errorhandler from "./../utils/Errorhandler.js";
import Logger from "./../utils/Logger.js";
import { getCode } from "./../utils/utils.js";
import BlackList from "./../models/BlackList.js";
import Registration from "./../models/Registration.js";
import Verification from "./../models/Verification.js";
import SendSMS from "./../services/sendSMS.js";
import { insertOne, findAndUpdate } from "./../database/query.js";

async function alreadyExist(req, res, next) {
  try {
    const status = req.body["regStatus"];
    const regAttempt = req.body["regAttempt"];
    const id = req.body["id"];
    const code = getCode(6);

    if (status === "registered") {
      if (regAttempt >= 5) {
        //blacklist the user here
        const data = { ipAddress: req.ip, reason: "Trying to abuse api" };
        await insertOne(BlackList, data);
        next(new Errorhandler("This user has been blacklisted", 403));
      } else {
        // update regAttempt, verification code and timestamp
        await findAndUpdate(Registration, { _id: id }, { regAttempt: regAttempt + 1 });
        await findAndUpdate(Verification, { userId: id }, { code: code, date: Date.now().toString() });
        const phone = req.body["phone"];
        //send verification and end req res circle
        const message = `Your smack verification code is ${code}. valid for 5 minutes`;
        const result = await SendSMS.send(phone, message);
        if (result["status"] === "fail") {
          Logger.log("ERROR", "Unable to send verification code", import.meta.url);
          next(new Errorhandler("Unable to send verification code", 500));
        } else {
          res.redirect(301, "/view/verification");
        }
      }
    } else if (status === "active") {
      next(new Errorhandler("This user has an active account", 403));
    }
  } catch (error) {
    Logger.log("ERROR", error, import.meta.url);
    next(new Errorhandler("An error occurred on our server", 500));
  }
}

export default alreadyExist;
