import { createStore, bindActionCreators, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { exampleActions } from "./example/index";
import thunk from "redux-thunk";
import { loginActions } from "./general";
import { newProductActions } from "./calculatorCalories";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const allActions = bindActionCreators(
  {
    add: exampleActions.add,
    reset: exampleActions.reset,
    login: loginActions.login,
    logout: loginActions.logout,
    sendInfo: newProductActions.sendInfo,
    addProduct: newProductActions.addProduct,
    sumProducts: newProductActions.sumProducts
  },
  store.dispatch
);

window.store = store;

store.dispatch(exampleActions.add("Example 4"));
allActions.add("Example 5");

export { store, allActions };
