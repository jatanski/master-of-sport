import express from "express";
import mongoose from "mongoose";
import config from "./config";

const app = express();

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on PORT ${port}...`));

mongoose
  .connect(
    `mongodb+srv://${config.username}:${
      config.password
    }@masterofcalories-czdx4.azure.mongodb.net/test?retryWrites=true&w=majority
`,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB Atlas!"))
  .catch(err => console.log("Something went wrong...", err));
