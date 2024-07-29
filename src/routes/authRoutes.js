import express from 'express';
import * as authController from "../controllers/auth.js";

const middleware = express.Router()

middleware.use("/profile", authController.checkSession)

middleware.post("/firstTime", authController.firstTimeUser)

middleware.post("/nuke", authController.nukeSession)

export default middleware;