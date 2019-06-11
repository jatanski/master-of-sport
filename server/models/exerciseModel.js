import mongoose from "mongoose";
import exerciseSchema from "../schemas/exerciseSchema";

const Exercise = mongoose.model("Exercise", exerciseSchema);

export default Exercise;
