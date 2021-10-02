import express from "express";
import Server from "./Server.js";
import Logger from "./../utils/Logger.js";

const app = express();
const options = {};
const httpServer = new Server("http", options, app);

app.get("/", (req, res) => {
  // Logger.log("INFO", new TypeError("Unknown type"), import.meta.url);
  res.json({ message: "Main server up and running" });
});

export default httpServer;
