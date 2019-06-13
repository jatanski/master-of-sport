import mongoose from "mongoose";
import workoutSchema from "../schemas/workoutSchema";

const Workout = mongoose.model("workout", workoutSchema);

export default Workout;
