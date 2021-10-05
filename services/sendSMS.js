import dotenv from "dotenv";
dotenv.config();
import Client from "twilio";
import Logger from "./../utils/Logger.js";

const twilio = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  number: process.env.TWILIO_NUMBER,
};

const client = new Client(twilio.accountSid, twilio.authToken);

class SendSMS {
  /**
   * Sends an SMS message
   * @param {string} recipientPhone recipients phone number
   * @param {string} message message to be sent
   * @returns {object} object containing the response.
   */
  static async send(recipientPhone, message) {
    try {
      const result = await client.messages.create({
        body: message,
        from: twilio.number,
        to: recipientPhone,
      });
      Logger.log("INFO", "SMS successfully sent", import.meta.url);
      return result;
    } catch (error) {
      Logger.log("ERROR", error, import.meta.url);
      return { errorCode: "Error", status: "failure" };
    }
  }
}

export default SendSMS;
