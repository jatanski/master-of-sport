import mongoose from "mongoose";

const myFoodProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  calories: {
    type: Number,
    required: true
  },
  carbohydrates: {
    type: Number,
    required: true
  },
  proteins: {
    type: Number,
    required: true
  },
  fats: {
    type: Number,
    required: true
  }
});

export default myFoodProductSchema;
