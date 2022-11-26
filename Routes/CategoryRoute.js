import express from "express";
const app = express.Router();
import passport from "passport";
import UserModel from "../models/UserModel.js";
app.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const categories = req.user.categories;
    const newCategories = categories.filter((i) => i._id != req.params.id);
    const user = await UserModel.updateOne(
      { _id: req.user.id },
      { $set: { categories: newCategories } }
    );
    res.json({ user });
  }
);
app.get("/", (req, res) => {
  res.json({ message: "good" });
});

app.post("/", async (req, res) => {
  const { label, icon } = req.body;
  console.log(label + "/" + icon);
  const response = await UserModel.updateOne(
    { _id: req.user.id },
    { $set: { categories: [...req.user.categories, { label, icon }] } }
  );
  res.json({ label: label, icon: icon });
});

export default app;
