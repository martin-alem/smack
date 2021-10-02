import FileReadWrite from "./FileReadWrite.js";
import { getFormattedDate } from "./utils.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, "../log");

class Logger {
  static log(type, error, file) {
    if (process.env.MODE === "development") {
      console.log(`${type.toUpperCase()}: ${error} - ${file} - ${new Date()}`);
    } else if (process.env.MODE === "production") {
      const data = `${type}: ${error.message} - ${new Date()} - ${file}\n`;
      const filePath = path.join(BASE, `${getFormattedDate()}.log`);
      FileReadWrite.writeToFile(data, filePath, "a+");
    }
  }
}

export default Logger;
