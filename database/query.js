import Logger from "./../utils/Logger.js";

function findOne(model, key, value) {
  model.findOne({ [key]: value }, (error, document) => {
    if (error) {
      Logger.log("Error", error, import.meta.url);
    } else {
      return document;
    }
  });
}

function insertOne(model, data) {
  model.create(data, (error, document) => {
    if (error) {
      Logger.log("Error", error, import.meta.url);
    } else {
      return document;
    }
  });
}

export { findOne, insertOne };
