import express from "express";
import { User } from "../models/userModel";
import Bmi from "../models/bmiModel";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  let user;
  user = await User.findById(req.user);

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

router.get("/", auth, async (res, req) => {
  let user;
  user = await User.findById(req.user);

  res.status(200).send(user.statistics.bmi);
});

export default router;
