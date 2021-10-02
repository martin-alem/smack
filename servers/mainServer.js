import express from "express";
import favicon from "serve-favicon";
import Server from "./Server.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const options = {};
const httpServer = new Server("http", options, app);

app.use(favicon(path.join(__dirname, "../public", "/image/favicon-32x32.png")));
app.use(favicon(path.join(__dirname, "../public", "/image/favicon-16x16.png")));
app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "ejs");

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.get("/verify", (req, res) => {
  res.render("verify.ejs");
});

app.get("/reset_request", (req, res) => {
  res.render("reset_request");
});
export default httpServer;
