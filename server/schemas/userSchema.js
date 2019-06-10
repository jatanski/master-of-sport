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
      dafault: {}
    }
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
