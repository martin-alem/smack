import { hashData } from "./../utils/utils.js";
import { getCode } from "./../utils/utils.js";
import Registration from "./../models/Registration.js";
import Verification from "./../models/Verification.js";
import Errorhandler from "./../utils/Errorhandler.js";
import Logger from "./../utils/Logger.js";
import { insertOne } from "./../database/query.js";

async function signupController(req, res, next) {
  const user = req.body;
  const hashedPassword = hashData(user["password"]);
  const registeredUser = { firstName: user["firstName"], lastName: user["lastName"], email: user["email"], phone: user["phone"], regAttempt: 0, status: "registered", password: hashedPassword };
  const result = await insertOne(Registration, registeredUser);
  if (result) {
    const id = result["_id"];
    const code = getCode(6);
    req.body["code"] = code;
    const verificationData = { userId: id, phone: user["phone"], code: code, status: "pending", verificationAttempt: 0, date: Date.now().toString() };
    await insertOne(Verification, verificationData);
    next();
  } else {
    Logger.log("ERROR", result, import.meta.url);
    next(new Errorhandler("Unable to register user", 500));
  }
}

export default signupController;
