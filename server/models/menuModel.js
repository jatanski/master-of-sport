import mongoose from "mongoose";
import menuSchema from "../schemas/menuSchema";

const MenuModel = mongoose.model("MenuModel", menuSchema);

export default MenuModel;
