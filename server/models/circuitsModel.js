import mongoose from "mongoose";
import circuitsSchema from "../schemas/circuitsSchema";

const Circuits = mongoose.model("Circuits", circuitsSchema);

export default Circuits;
