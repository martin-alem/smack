import Errorhandler from "./../utils/Errorhandler.js";
import Logger from "./../utils/Logger.js";
import { findOne } from "./../database/query.js";
import Registration from "./../models/Registration.js";
import alreadyExist from "./alreadyExistMiddleware.js";

async function lastNameExist(req, res, next) {
  try {
    const lastName = req.body["lastName"];
    const result = await findOne(Registration, { lastName: lastName });
    if (!result) {
      next();
    } else {
      req.body["regStatus"] = result["status"];
      req.body["regAttempt"] = result["regAttempt"];
      req.body["id"] = result["_id"];
      req.body["phone"] = result["phone"];
      alreadyExist(req, res, next);
    }
  } catch (error) {
    Logger.log("ERROR", error, import.meta.url);
    next(new Errorhandler("An error occurred on our server", 500));
  }
}

async function phoneExist(req, res, next) {
  try {
    const phone = req.body["phone"];
    const result = await findOne(Registration, { phone: phone });
    if (!result) {
      next();
    } else {
      req.body["regStatus"] = result["status"];
      req.body["regAttempt"] = result["regAttempt"];
      req.body["id"] = result["_id"];
      req.body["phone"] = result["phone"];
      alreadyExist(req, res, next);
    }
  } catch (error) {
    Logger.log("ERROR", error, import.meta.url);
    next(new Errorhandler("An error occurred on our server", 500));
  }
}

export { lastNameExist, phoneExist };
