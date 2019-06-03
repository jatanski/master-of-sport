import { createStore, bindActionCreators, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { exampleActions } from "./example/index";
import thunk from "redux-thunk";
import { loginActions } from "./general";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(exampleActions.add("Example 4"));

const allActions = bindActionCreators(
  {
    add: exampleActions.add,
    reset: exampleActions.reset,
    login: loginActions.login,
    logout: loginActions.logout
  },
  store.dispatch
);

window.store = store;

allActions.add("Example 5");

export { store, allActions };
