import { createHash } from "crypto";

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
