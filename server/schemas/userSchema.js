//import library from node_modules
import mongoose from "mongoose";
import config from "../config";
import jwt from "jsonwebtoken";

//create user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255
  },
  statistics: {
    bmi: {
      type: Array,
      default: []
    },
    circuits: {
      type: Array,
      default: []
    },
    plans: {
      type: Array,
      default: []
    },
    menus: {
      type: Array,
      default: []
    }
  },
  workouts: {
    type: Array,
    default: []
  },
  nameOfWorkputs: {
    type: Array,
    default: []
  },
  nutritionalPlans: {
    type: Array,
    default: []
  },
  myFoodProducts: {
    type: Array,
    default: []
  },
  foodNames: {
    type: Array,
    default: []
  }
});

//generate token
userSchema.methods.genToken = function() {
  return jwt.sign(
    {
      _id: this._id
    },
    config.jwtKey
  );
};

export default userSchema;
