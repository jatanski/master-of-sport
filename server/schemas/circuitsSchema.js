import mongoose from "mongoose";

const circuitsSchema = new mongoose.Schema({
  weight: Number,
  circuits: {
    calf: Number,
    thigh: Number,
    rear: Number,
    waist: Number,
    chest: Number,
    biceps: Number,
    forearm: Number
  },
  date: {
    type: String,
    required: true,
    unique: true
  }
});

export default circuitsSchema;
