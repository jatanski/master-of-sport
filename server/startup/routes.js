import express from "express";

//import routes
import signUp from "../routes/singUp";
import loginIn from "../routes/loginIn";
import bmi from "../routes/bmi";
import circuits from "../routes/circuits";
import plans from "../routes/plans";
import workouts from "../routes/workouts";
import nutritionalPlans from "../routes/nutritionalPlans";
import menus from "../routes/menus";
import myfoodProduct from "../routes/myFoodProduct";

const startRoutes = app => {
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
};

export default startRoutes;
