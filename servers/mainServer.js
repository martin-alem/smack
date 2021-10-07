import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import favicon from "serve-favicon";
import Server from "./Server.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import { connectToSmackDatabase } from "./../database/connection.js";
import viewRouter from "./../routes/viewRouter.js";
import userRouter from "./../routes/userRouter.js";
import privateRouter from "./../routes/privateRouter.js";

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));

//connect to smack database
connectToSmackDatabase();

const app = express();
const options = {};
const httpServer = new Server("http", options, app);

app.use(express.json());
app.use(cookieParser());
app.use(favicon(path.join(__dirname, "../public", "/image/favicon-32x32.png")));
app.use(favicon(path.join(__dirname, "../public", "/image/favicon-16x16.png")));
app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "ejs");

// views
app.use("/", viewRouter);
// users
app.use("/user", userRouter);

//private resources
app.use("/private", privateRouter);

export default httpServer;
