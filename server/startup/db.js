import config from "./config";
import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(
      `mongodb+srv://${config.username}:${config.password}@masterofcalories-czdx4.azure.mongodb.net/test?retryWrites=true&w=majority
`,
      { useNewUrlParser: true, useCreateIndex: true }
    )
    .then(() => console.log("Connected to MongoDB Atlas!"))
    .catch(err => console.log("Something went wrong...", err));
};

export default connectDB;
