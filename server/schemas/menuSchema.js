import mongoose from "mongoose";

const menuPlanSchema = mongoose.Schema({
  nameOfnutritionalPlan: {
    type: String,
    require: true,
    unique: true
  },
  meals: {
    type: Array,
    default: []
  },
  summary: {
    type: Object,
    default: {}
  },
  date: String
});

export default menuPlanSchema;
