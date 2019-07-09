//import library from node_modules
import express from "express";
import mongoose from "mongoose";

//import other files in our project
import config from "./config";

//import routes
import signUp from "./routes/singUp";
import loginIn from "./routes/loginIn";
import bmi from "./routes/bmi";
import circuits from "./routes/circuits";
import plans from "./routes/plans";
import workouts from "./routes/workouts";
import nutritionalPlans from "./routes/nutritionalPlans";
import menus from "./routes/menus";
import myfoodProduct from "./routes/myFoodProduct";

//create app
const app = express();

//listening on port
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on PORT ${port}...`));

//connect to DB
mongoose
  .connect(
    `mongodb+srv://${config.username}:${
      config.password
    }@masterofcalories-czdx4.azure.mongodb.net/test?retryWrites=true&w=majority
`,
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => console.log("Connected to MongoDB Atlas!"))
  .catch(err => console.log("Something went wrong...", err));

// parse to JSON
app.use(express.json());

//create endpoint
app.use("/register", signUp);
app.use("/login", loginIn);
app.use("/bmi", bmi);
app.use("/circuits", circuits);
app.use("/plans", plans);
app.use("/workouts", workouts);
app.use("/nutritionalPlans", nutritionalPlans);
app.use("/menus", menus);
app.use("/myFoodProduct", myfoodProduct);
