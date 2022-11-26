import express from "express";
import cors from "cors";
import connect from "./database/database.js";
import TransactionRouter from "./Routes/TransactionRoute.js";
import UserRouter from "./Routes/UserRoute.js";
import passport from "passport";
import passportConfig from "./config/passport.js";
import * as dotenv from "dotenv";
import validateToken from "./Routes/ValidateToken.js";
import Category from "./Routes/CategoryRoute.js";

dotenv.config();
//app
const app = express();
//port
const port = process.env.PORT;
//middle ware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passportConfig(passport);
//database
await connect();
//route transaction
app.use(
  "/transaction",
  passport.authenticate("jwt", { session: false }),
  TransactionRouter
);
//route user
app.use("/auth", UserRouter);
//route token validation
app.use("/token", validateToken);
app.use(
  "/category",
  passport.authenticate("jwt", { session: false }),
  Category
);
app.get("/", (req, res) => {
  res.json({ message: "hello" });
});
//listen port
app.listen(port, () => {
  console.log("server is running on port http://localhost:" + port);
});
