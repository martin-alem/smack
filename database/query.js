import Logger from "./../utils/Logger.js";

async function findOne(model, query) {
  try {
    const document = await model.findOne(query);
    return document;
  } catch (error) {
    Logger.log("Error", error, import.meta.url);
  }
}

async function insertOne(model, data) {
  try {
    const result = await model.create(data);
    return result;
  } catch (error) {
    Logger.log("Error", error, import.meta.url);
  }
}

function findAndUpdate(model, filter, data) {
  let result = null;

  model.findOneAndUpdate(filter, data, (error, document) => {
    if (error) {
      Logger.log("Error", error, import.meta.url);
    } else {
      result = document;
    }
  });

  return result;
}

export { findOne, insertOne, findAndUpdate };
