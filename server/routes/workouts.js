import express from "express";
import { User } from "../models/userModel";
import Workout from "../models/workoutsModel";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  let user;
  user = await User.findById(req.user);

  const { exercises, date, kindOfWorkout } = await req.body;

  const dateExist = user.statistics.bmi.filter(el => {
    if (el.date === date) return el;
  });
  if (dateExist[0])
    return res.status(400).send("Workout with this date arleady exicts.");

  //create new Workout object
  let workout = new Workout({
    date: date,
    exercises: exercises
  });
  //   console.log(workout);
  //   console.log(user.statistics.workouts[kindOfWorkout]);

  //   const workoutType = user.statistics.workouts.filter(el => {
  //     return el.name === kindOfWorkout;
  //   });

  user.statistics.workouts.forEach(el => {
    if (el.name === kindOfWorkout) el.workouts.push(workout);
  });

  //   console.log(workoutType);
  console.log(user.statistics.workouts);

  //   user.statistics.workouts[kindOfWorkout].workouts.push(workout);
  //   console.log(user.statistics.workouts[kindOfWorkout]);

  await user.save();

  res.status(200).send(user);
});

router.get("/", auth, async (req, res) => {
  let user;
  user = await User.findById(req.user);

  const { kindOfWorkout } = await req.body;

  res.status(200).send(user.statistics.workouts[kindOfWorkout].workouts);
});

export default router;
