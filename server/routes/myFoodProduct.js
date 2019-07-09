/* eslint-disable array-callback-return */
import express from "express";
import { User } from "../models/userModel";
import MyFoodProduct from "../models/myFoodProductModel";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  let user;
  user = await User.findById(req.user);

  const { name, calories, carbo, fats, proteins } = await req.body;

  //   check if name already exist
  const nameExist = user.myFoodProducts.filter(el => {
    if (el.name === name) return el;
  });
  if (nameExist[0])
    return res.status(400).send("Product with this name arleady exicts.");

  //create new Product object
  let product = new MyFoodProduct({
    name: name,
    calories: calories,
    proteins: proteins,
    fats: fats,
    carbohydrates: carbo
  });

  user.myFoodProducts.push(product);
  user.foodNames.push(name);

  await user.save();

  res.status(200).send(user.myFoodProducts);
});

router.get("/", auth, async (req, res) => {
  let user;
  user = await User.findById(req.user);

  const name = await req.headers.name;

  const nameDetails = user.myFoodProducts.filter(el => {
    return el.name === name;
  });

  console.log(nameDetails[0]);

  res.status(200).send(nameDetails[0]);
});

router.get("/names", auth, async (req, res) => {
  let user;
  user = await User.findById(req.user);

  res.status(200).send(user.foodNames);
});

export default router;
