import { writeFile, readFile } from "fs/promises";
import { writeFileSync, readFileSync } from "fs";

class FileReadWrite {
  static async writeToFile(data, filePath, flag) {
    try {
      await writeFile(filePath, data, { flag });
    } catch (error) {
      console.error(error);
    }
  }

  static writeToFileSync(data, filePath, flag) {
    try {
      writeFileSync(filePath, data, { flag });
    } catch (error) {
      console.error(error);
    }
  }

  static async readFromFile(filePath, flag) {
    try {
      const content = await readFile(filePath, { flag });
      return content;
    } catch (error) {
      console.error(error);
    }
  }

  static readFromFileSync(filePath, flag) {
    try {
      const content = readFileSync(filePath, { flag });
      return content;
    } catch (error) {
      console.error(error);
    }
  }
}

export default FileReadWrite;
