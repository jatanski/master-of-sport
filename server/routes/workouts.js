import express from "express";
import { User } from "../models/userModel";
import Workout from "../models/workoutsModel";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  let user;
  user = await User.findById(req.user);

  const { exercises, date, kindOfWorkout } = await req.body;

  const dateExist = user.workouts.filter(el => {
    if (el.date === date && el.type === kindOfWorkout) return el;
  });
  if (dateExist[0])
    return res
      .status(400)
      .send("Workout with this type and date arleady exicts.");

  //create new Workout object
  let workout = new Workout({
    date: date,
    exercises: exercises,
    type: kindOfWorkout
  });

  user.workouts.push(workout);

  const workoutNameExist = user.nameOfWorkputs.some(el => {
    return el === kindOfWorkout;
  });

  if (!workoutNameExist) user.nameOfWorkputs.push(kindOfWorkout);

  await user.save();

  res.status(200).send(user.workouts);
});

router.get("/", auth, async (req, res) => {
  let user;
  user = await User.findById(req.user);

  res.status(200).send(user.workouts);
});

export default router;
