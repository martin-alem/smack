import dotenv from "dotenv";
import Logger from "./../utils/Logger.js";
import { buildEmailTemplate } from "./../utils/utils.js";
import sgMail from "@sendgrid/mail";

dotenv.config();

class SendEmail {
  /**
   * sends an email using sendgrid library.
   * This function internally handles any exceptions.
   * @param {object} options options for sending mail
   * @returns {promise} return a promise that resolves or rejects to a boolean
   */
  static async sendEmail(options) {
    const { templateName, address, subject, url } = options;
    const template = await buildEmailTemplate(templateName, url);
    sgMail.setApiKey(process.env.SG_API_KEY);
    const msg = {
      to: address,
      from: process.env.EMAIL,
      subject: subject,
      html: template,
    };

    try {
      await sgMail.send(msg);
      Logger.log("INFO", "Email successfully sent", import.meta.url);
    } catch (error) {
      Logger.log("Error", error, import.meta.url);
    }
  }
}

export default SendEmail;
