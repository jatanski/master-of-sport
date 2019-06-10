import mongoose from "mongoose";

const bmiSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true,
    unique: true
  }
});

export default bmiSchema;
