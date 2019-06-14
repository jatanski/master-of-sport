import mongoose from "mongoose";

const nutrionalPlanSchema = mongoose.Schema({
  name: {
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
  }
});

export default nutrionalPlanSchema;
