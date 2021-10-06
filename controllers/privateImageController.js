import Errorhandler from "../utils/Errorhandler.js";
import Logger from "./../utils/Logger.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

function privateImageController(req, res, next) {
  try {
    const extension = req.url.split(".")[1];
    const options = {
      root: path.join(__dirname, "../private"),
      dotfiles: "deny",
      headers: {
        "x-timestamp": Date.now(),
        "x-sent": true,
        "Content-Type": `image/${extension}`,
      },
    };

    const fileName = req.url;
    res.sendFile(fileName, options, function (err) {
      if (err) {
        next(err);
      } else {
        console.log("Sent:", fileName);
      }
    });
  } catch (error) {
    Logger.log("ERROR", error, import.meta.url);
    next(new Errorhandler("An error occurred on our server", 500));
  }
}

export default privateImageController;
