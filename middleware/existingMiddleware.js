import { findOne } from "./../database/query.js";
import Registration from "./../models/Registration.js";
import alreadyExist from "./alreadyExistMiddleware.js";

function lastNameExist(req, res, next) {
  const lastName = req.body["lastName"];
  const result = findOne(Registration, "lastName", lastName);
  if (!result) {
    next();
  } else {
    const regStatus = result["status"];
    const regAttempt = result["regAttempt"];
    req["regStatus"] = regStatus;
    req["regAttempt"] = regAttempt;
    alreadyExist(req, res, next);
  }
}

function phoneExist(req, res, next) {
  const phone = req.body["phone"];
  const result = findOne(Registration, "phone", phone);
  if (!result) {
    next();
  } else {
    const regStatus = result["status"];
    const regAttempt = result["regAttempt"];
    req["regStatus"] = regStatus;
    req["regAttempt"] = regAttempt;
    alreadyExist(req, res, next);
  }
}

export { lastNameExist, phoneExist };
