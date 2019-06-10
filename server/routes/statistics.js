import express from "express";
import Statistics from "../models/statisticsModel";
import auth from '../middleware/auth'

const router = express.Router();

router.post("/",auth, async (req, res) => {
  const { value, date } = req.body;

  let bmi = await 
});