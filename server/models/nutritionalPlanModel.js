import mongoose from "mongoose";
import nutrionalPlanSchema from "../schemas/nutrionalPlanSchema";

const NutrionalPlan = mongoose.model("NutrionalPlan", nutrionalPlanSchema);

export default NutrionalPlan;
