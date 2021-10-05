import Errorhandler from "../utils/Errorhandler.js";
import Logger from "./../utils/Logger.js";
import Registration from "./../models/Registration.js";
import Verification from "./../models/Verification.js";
import User from "./../models/User.js";
import LoginUser from "./../models/Login.js";
import { insertOne, findOne, findAndUpdate } from "./../database/query.js";

async function registerUser(req, res, next) {
  try {
    const phone = req.body["phone"];
    const registeredUser = await findAndUpdate(Registration, { phone: phone }, { status: "active" });
    const verifiedUser = await findAndUpdate(Verification, { phone: phone }, { status: "verified" });
    const newUser = { firstName: registeredUser.firstName, lastName: registeredUser.lastName, email: registeredUser.email, phone: phone, status: "active" };
    const newRegisteredUser = await insertOne(User, newUser);
    const loginUser = { userId: newRegisteredUser._id, phone: newRegisteredUser.phone, password: registeredUser.password, status: newRegisteredUser.status, loginAttempts: 0, date: Date.now().toString() };
    const activeUser = await insertOne(LoginUser, loginUser);
    next();
  } catch (error) {
    Logger.log("ERROR", error, import.meta.url);
    next(new Errorhandler("An error occurred on our server", 500));
  }
}

export default registerUser;
