import express from "express";
import bcrypt from "bcryptjs";
import { User, validateUserLoginIn } from "../models/userModel";

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateUserLoginIn(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  let user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(400).send("Invalid email or passwors");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or passwors");

  res
    .header("x-auth-token", user.genToken())
    .status(200)
    .send(user._id);
});

export default router;
