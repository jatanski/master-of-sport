import { createStore, bindActionCreators, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { loginActions } from "./general";
import { newProductActions } from "./calculatorCalories";
import { mealsActions } from "./meals";
import { mealNewActions } from "./newMeals";

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
    changeProduct: newProductActions.changeProduct,
    sumProducts: newProductActions.sumProducts,
    sumMeals: newProductActions.sumMeals,
    resetMeals: newProductActions.resetMeals,
    addMeal: mealsActions.addMeal,
    addNewProduct: mealsActions.addNewProduct,
    changeNewProduct: mealsActions.changeNewProduct,
    resetProduct: mealsActions.resetProduct,
    addNewMeal: mealNewActions.addNewMeal,
    resetNewMeal: mealNewActions.resetNewMeal
  },
  store.dispatch
);

window.store = store;

export { store, allActions };
