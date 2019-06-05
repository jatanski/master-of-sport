import { combineReducers } from "redux";
import exampleReducers from "./example";
import loginReducer from "./general";
import newProductReducer from "./calculatorCalories";

const rootReducer = combineReducers({
  example: exampleReducers,
  login: loginReducer,
  newProduct: newProductReducer
});

export default rootReducer;
