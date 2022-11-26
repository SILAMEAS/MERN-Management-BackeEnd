import mongoose from "mongoose";
async function connect() {
  await mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.94hkpyw.mongodb.net/app?retryWrites=true&w=majority`
    )
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));
}

export default connect;
