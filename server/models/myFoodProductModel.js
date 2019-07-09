import mongoose from "mongoose";
import myFoodProductSchema from "../schemas/myFoodProductSchema";

const MyFoodProduct = mongoose.model("MyFoodProduct", myFoodProductSchema);

export default MyFoodProduct;
