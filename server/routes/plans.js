import express from "express";
import { User } from "../models/userModel";
import TrainingPlan from "../models/trainingPlanModel";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  let user;
  user = await User.findById(req.user);

  const { name, exercises } = await req.body;

  // check if date already exist
  // eslint-disable-next-line array-callback-return
  const dateExist = user.statistics.plans.filter(el => {
    if (el.name === name) return el;
  });
  if (dateExist[0])
    return res.status(400).send("Plan with this name arleady exicts.");

  //create new plan object
  let plan = new TrainingPlan({
    name: name,
    exercises: exercises
  });

  user.statistics.plans.push(plan);
  await user.save();

  res.status(200).send(user.statistics.plans);
});

router.get("/", auth, async (req, res) => {
  let user;
  user = await User.findById(req.user);

  res.status(200).send(user.statistics.plans);
});

export default router;
