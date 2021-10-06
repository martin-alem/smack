import { createHash } from "crypto";
import crypto from "crypto";
import FileReadWrite from "./FileReadWrite.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

export function getFormattedDate() {
  const date = new Date();
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
}
/**
 * Generates code of number length.
 * @param {number} number length of code to generate
 * @returns {string} a string representing the code.
 */
export function getCode(number) {
  let code = "";
  for (let i = 0; i < number; i++) {
    const random = Math.floor(Math.random() * 10);
    code += random.toString(10);
  }

  return code;
}

export function signCookie(rawCookie) {
  const sign = crypto.createSign("SHA256");
  sign.update(rawCookie);
  sign.end();
  const privateKey = JSON.parse(FileReadWrite.readFromFileSync(path.join(__dirname, "../key", "/keys.json"), "r").toString())[0]["sign_and_verify"]["private"];
  const signature = sign.sign(privateKey);
  return signature;
}

export function verifyCookie(cookie, signature) {
  const verify = crypto.createVerify("SHA256");
  verify.update(cookie);
  verify.end();
  const publicKey = JSON.parse(FileReadWrite.readFromFileSync(path.join(__dirname, "../key", "/keys.json"), "r").toString())[0]["sign_and_verify"]["public"];
  return verify.verify(publicKey, signature);
}

/**
 * hashes any data using sha256
 * @param {any} data
 * @returns {string} hash string
 */
export function hashData(data) {
  const hash = createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
}

export async function buildEmailTemplate(templateName, url) {
  let template = await FileReadWrite.readFromFile(path.join(__dirname, "../templates", `${templateName}.html`));
  template = template.toString().replace("[URL]", `${url}`);
  return template;
}
