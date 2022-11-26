import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const categories = [
  { label: "Car", icon: "user" },
  { label: "Moto", icon: "user" },
  { label: "Enictonic", icon: "user" },
  { label: "Food", icon: "user" },
  { label: "Drink", icon: "user" },
  { label: "Shopping", icon: "user" },
];
export const get = async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
};

export const create = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  // hash the password
  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hashSync(password, salt);
  // check email exits or not
  const exits = await UserModel.findOne({ email });
  if (!exits) {
    const user = await UserModel({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      categories,
    });
    await user.save();
    res.status(201).json({ message: "success" });
    console.log(user.email + " : was created at : " + user.createdAt);
  } else {
    res.status(406).json({ message: "exits" });
    return;
  }
};
export const checklogin = async (req, res) => {
  const { email, password } = req.body;
  // check email exits or not
  const exits = await UserModel.findOne({ email });
  if (!exits) {
    res.status(406).json({ message: "Don't have this user" });
    return;
  }
  const check = await bcrypt.compare(password, exits.password);
  // console.log(exits.password + "/" + password);
  // console.log(check);
  if (!check) {
    res.status(406).json({ message: "Don't have this user" });
    return;
  }
  // create jwt-------------------------------------------------------------------------------
  const payload = {
    username: email,
    _id: exits._id,
  };
  // create jwt------------------------------------------------------------------------------- in video _id:user._id
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  res.json({ message: "success", token, exits });
};
