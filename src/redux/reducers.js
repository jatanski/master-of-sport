import { combineReducers } from "redux";
import exampleReducers from "./example";
import loginReducer from "./general";

const rootReducer = combineReducers({
  example: exampleReducers,
  login: loginReducer
});

export default rootReducer;
