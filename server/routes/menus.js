import express from "express";
import { User } from "../models/userModel";
import Menu from "../models/menuModel";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  let user = await User.findById(req.user);

  const { name, meals, summary, date } = await req.body;
  // check if date already exist
  // eslint-disable-next-line array-callback-return
  const dateExist = user.statistics.plans.filter(el => {
    if (el.date === date) return el;
  });
  if (dateExist[0])
    return res.status(400).send("Plan with this date arleady exicts.");

  //create new plan object
  let menu = new Menu({
    name: name,
    meals: meals,
    summary: summary,
    date: date
  });
  user.statistics.menus.push(menu);
  await user.save();

  res.status(200).send(user.statistics.menus);
});

router.get("/", auth, async (req, res) => {
  let user = await User.findById(req.user);

  res.status(200).send(user.statistics.menus);
});

export default router;
