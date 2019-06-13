import mongoose from "mongoose";

const workoutSchema = mongoose.Schema({
  date: String,
  exercises: Object,
  type: String
});

export default workoutSchema;
