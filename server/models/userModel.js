import mongoose from "mongoose";
import Joi from "@hapi/joi";
import userSchema from "../schemas/userSchema";

const User = mongoose.model("User", userSchema);

const validateUserSignUp = user => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string()
      .min(6)
      .max(30)
      .required()
  });
  return Joi.validate(user, schema);
};

const validateUserLoginIn = user => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string()
      .min(6)
      .max(30)
      .required()
  });
  return Joi.validate(user, schema);
};

export { User, validateUserLoginIn, validateUserSignUp };
