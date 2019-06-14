import mongoose from "mongoose";

const allWorkoutsOneKindSchema = mongoose.Schema({
  name: String,
  trainings: {
    type: Array,
    default: []
  }
});

export default allWorkoutsOneKindSchema;
