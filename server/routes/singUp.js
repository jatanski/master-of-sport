//import library from node_modules
import express from "express";
import bcrypt from "bcryptjs";
import { User, validateUserSignUp } from "../models/userModel";
import auth from "../middleware/auth";

const router = express.Router();

//create endpoint POST
router.post("/", async (req, res) => {
  const { error } = validateUserSignUp(req.body);
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

router.put("/", auth, async (req, res) => {
  let user = await User.findById(req.user);
  console.log(user);
  const { oldPassword, newPassword } = req.body;

  const validPassword = await bcrypt.compare(oldPassword, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or passwors");

  user.password = await bcrypt.hash(newPassword, await bcrypt.genSalt(10));

  await user.save();

  res
    .header("x-auth-token", user.genToken())
    .status(200)
    .send(user._id);
});

export default router;
