import mongoose from "mongoose";
const userScheme = mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    categories: [{ label: String, icon: String }],
  },
  { timestamps: true }
);

export default mongoose.model("allusers", userScheme);
