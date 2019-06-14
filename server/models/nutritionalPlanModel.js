import mongoose from "mongoose";
import nutritionalPlanSchema from "../schemas/nutritionalPlanSchema";

const NutrionalPlan = mongoose.model("NutrionalPlan", nutritionalPlanSchema);

export default NutrionalPlan;
