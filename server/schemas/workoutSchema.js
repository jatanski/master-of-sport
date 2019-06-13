import mongoose from "mongoose";

const workoutSchema = mongoose.Schema({
  date: Date,
  exercises: Object
});

export default workoutSchema;
