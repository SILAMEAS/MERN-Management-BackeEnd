import express from "express";
import TransactionModel from "../models/TransactionModel.js";
import passport from "passport";
import * as TransactionController from "../controller/TransactionController.js";
const app = express.Router();
// create data
app.post("/", TransactionController.create);

// router get data
app.get(
  "/",
  // controller
  TransactionController.get
);
//router delete
app.delete("/:id", TransactionController.delete_);
//router update
app.patch("/:id", TransactionController.update);
// router get data
app.get("/:id", TransactionController.getOnlyOne);
export default app;
