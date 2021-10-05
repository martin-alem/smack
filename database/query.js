import BlackList from "./../models/BlackList.js";
import Logger from "./../utils/Logger.js";

function findOne(key, value) {
  BlackList.findOne({ [key]: value }, (error, document) => {
    if (error) {
      Logger.log("Error", error, import.meta.url);
    } else {
      return document;
    }
  });
}

export { findOne };
