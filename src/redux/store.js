import { createStore, bindActionCreators, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { exampleActions } from "./example/index";
import thunk from "redux-thunk";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(exampleActions.add("Example 4"));

const allActions = bindActionCreators(
  { add: exampleActions.add, reset: exampleActions.reset },
  store.dispatch
);

allActions.add("Example 5");

export default store;
