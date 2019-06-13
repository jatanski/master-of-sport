import mongoose from "mongoose";

const allWorkoutsOneKindSchema = mongoose.Schema({
  name: String,
  workouts: {
    type: Array,
    default: []
  }
});

export default allWorkoutsOneKindSchema;
