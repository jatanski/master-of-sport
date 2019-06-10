import mongoose from "mongoose";
import bmiSchema from "../schemas/bmiSchema";

const Bmi = mongoose.model("Bmi", bmiSchema);

export default Bmi;
