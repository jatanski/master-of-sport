import mongoose from "mongoose";
import trainingPlanSchema from "../schemas/trainingPlanSchema";

const TrainingPlan = mongoose.model("TrainingPlan", trainingPlanSchema);

export default TrainingPlan;
