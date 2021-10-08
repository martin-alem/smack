import Errorhandler from "../utils/Errorhandler.js";
import Logger from "./../utils/Logger.js";
import User from "./../models/User.js";
import { findAndUpdate } from "./../database/query.js";
import FileReadWrite from "./../utils/FileReadWrite.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

async function updateController(req, res, next) {
  try {
    const data = req.body;
    if (data["rawImage"]) {
      const rawImage = data["rawImage"].split(",")[1];
      FileReadWrite.writeToFileSync(Buffer.from(rawImage, "base64"), path.join(__dirname, "../private/images", `${data["id"]}.${data["extension"]}`), "w");
    }
    await findAndUpdate(User, { _id: data["id"] }, data["user_data"]);
    res.status(204).end();
  } catch (error) {
    Logger.log("ERROR", error, import.meta.url);
    next(new Errorhandler("An error occurred on our server", 500));
  }
}

export default updateController;
