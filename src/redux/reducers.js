import { combineReducers } from "redux";
import loginReducer from "./general";
import {
  newProductReducer,
  allProductsReducer,
  sumProductsReducer,
  sumMealsReducer
} from "./calculatorCalories";
import { mealReducer, productReducer } from "./meals";
import { mealNewReducer } from "./newMeals";

const rootReducer = combineReducers({
  login: loginReducer,
  newProduct: newProductReducer,
  allProducts: allProductsReducer,
  sumProducts: sumProductsReducer,
  sumMeals: sumMealsReducer,
  meal: mealReducer,
  product: productReducer,
  mealNew: mealNewReducer
});

export default rootReducer;
