import { createStore, bindActionCreators, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { loginActions } from "./general";
import { newProductActions } from "./calculatorCalories";
import { mealsActions } from "./meals";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const allActions = bindActionCreators(
  {
    login: loginActions.login,
    logout: loginActions.logout,
    sendInfo: newProductActions.sendInfo,
    addProduct: newProductActions.addProduct,
    sumProducts: newProductActions.sumProducts,
    sumMeals: newProductActions.sumMeals,
    addMeal: mealsActions.addMeal,
    addNewProduct: mealsActions.addNewProduct,
    resetProduct: mealsActions.resetProduct
  },
  store.dispatch
);

window.store = store;

export { store, allActions };
