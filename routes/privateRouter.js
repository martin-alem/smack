import express from "express";
import privateImageController from "./../controllers/privateImageController.js";
import { protectHome } from "./../middleware/authorization.js";

const privateRouter = express.Router();

privateRouter.route("/images/*").get(protectHome, privateImageController);

export default privateRouter;
