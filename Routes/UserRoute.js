import express from "express";

import * as UserController from "../controller/UserController.js";

const app = express.Router();
// get all user in system
app.get("/", UserController.get);
// register
app.post("/register", UserController.create);
// login
app.post("/login", UserController.checklogin);
export default app;
