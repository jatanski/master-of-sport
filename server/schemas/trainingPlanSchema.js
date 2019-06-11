import mongoose from "mongoose";

const trainingPlanSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true
  },
  exercises: {
    type: Array,
    default: []
  }
});

export default trainingPlanSchema;
