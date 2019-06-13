import mongoose from "mongoose";
import allWorkoutsOneKindSchema from "../schemas/allWorkoutsOneKindSchema";

const AllWorkoutsOneKind = mongoose.model(
  "AllWorkoutsOneKind",
  allWorkoutsOneKindSchema
);

export default AllWorkoutsOneKind;
