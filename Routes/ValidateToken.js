import express from "express";
const app = express.Router();
import passport from "passport";
app.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({ user: req.user });
});

export default app;
