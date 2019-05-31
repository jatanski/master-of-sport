import express from "express";
import bcrypt from "bcrypt";
import { User, validateSignUp } from "../models/userModel";

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateSignUp(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password } = req.body;

  //check if user already exist
  let user = await User.findOne({ email: email.toLowerCase() });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    name: name,
    email: email.toLowerCase(),
    password: await bcrypt.hash(password, await bcrypt.genSalt(10))
  });

  try {
    const response = await user.save();
    res
      .header("x-auth-token", response.genToken())
      .status(200)
      .send(response._id);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
});

export default router;
