import express from "express";
import { User } from "../models/userModel";
import NutritionalPlan from "../models/nutritionalPlanModel";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  let user = await User.findById(req.user);

  const { name, meals, summary } = await req.body;
  // check if date already exist
  // eslint-disable-next-line array-callback-return
  const dateExist = user.statistics.plans.filter(el => {
    if (el.name === name) return el;
  });
  if (dateExist[0])
    return res.status(400).send("Plan with this name arleady exicts.");

  //create new plan object
  let plan = new NutritionalPlan({
    name: name,
    meals: meals,
    summary: summary
  });
  user.nutritionalPlan.push(plan);
  await user.save();

  res.status(200).send(user.nutritionalPlan);
});

router.get("/", auth, async (req, res) => {
  let user = await User.findById(req.user);

  res.status(200).send(user.nutritionalPlan);
});
