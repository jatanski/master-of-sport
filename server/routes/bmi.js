import express from "express";
import { User } from "../models/userModel";
import Bmi from "../models/bmiModel";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  let user;
  user = await User.findById(req.user);
  if (!user) return res.status(400).send("Invalid email or password.");

  //create new bmi object
  console.log(user);
  let bmi = await new Bmi({
    value: req.body.value,
    date: req.body.date
  });

  user.statistics.bmi.push(bmi);
  await user.save();

  res.status(200).send(user.statistics.bmi);
});

export default router;
