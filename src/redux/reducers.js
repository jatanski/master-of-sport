import { combineReducers } from "redux";
import exampleReducers from "./example";
import loginReducer from "./general";
import {
  newProductReducer,
  allProductsReducer,
  sumProductsReducer
} from "./calculatorCalories";

const rootReducer = combineReducers({
  example: exampleReducers,
  login: loginReducer,
  newProduct: newProductReducer,
  allProducts: allProductsReducer,
  sumProducts: sumProductsReducer
});

export default rootReducer;
