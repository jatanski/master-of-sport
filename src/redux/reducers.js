import { combineReducers } from "redux";
import exampleReducers from "./example";

const rootReducer = combineReducers({
  example: exampleReducers
});

export default rootReducer;
