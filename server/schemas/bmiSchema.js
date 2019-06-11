import mongoose from "mongoose";

const bmiSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  }
});

export default bmiSchema;
