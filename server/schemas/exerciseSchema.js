import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  numberOfSeries: {
    type: Number,
    require: true
  },
  series: {
    type: Array,
    default: []
  }
});

export default exerciseSchema;
