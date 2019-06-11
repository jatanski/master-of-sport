import express from "express";
import { User } from "../models/userModel";
import Circuits from "../models/circuitsModel";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  let user;
  user = await User.findById(req.user);

  const { weight, circuits, date } = await req.body;

  // eslint-disable-next-line array-callback-return
  const dateExist = user.statistics.circuits.filter(el => {
    if (el.date === date) return el;
  });
  if (dateExist[0])
    return res.status(400).send("Circuits with this date arleady exicts.");

  //create new circuits object
  let measurement = new Circuits({
    weight: weight,
    circuits: circuits,
    date: date
  });

  user.statistics.circuits.push(measurement);
  await user.save();

  res.status(200).send(user.statistics.circuits);
});

router.get("/", auth, async (req, res) => {
  let user;
  user = await User.findById(req.user);

  res.status(200).send(user.statistics.circuits);
});

export default router;
