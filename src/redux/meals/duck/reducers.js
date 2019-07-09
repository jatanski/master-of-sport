/* eslint-disable array-callback-return */
import types from "./types";

const MEAL_STATE = {
  meals: []
};

const mealReducer = (state = MEAL_STATE, action) => {
  switch (action.type) {
    case types.ADD_MEAL:
      return {
        meals: [...state.meals, []]
      };
    case types.ADD_NEW_PRODUCT:
      return {
        meals: [
          state.meals.map((el, i) => {
            if (state.meals.length === i + 1) {
              return [...el, action.item];
            }
          })
        ]
      };
    case types.CHANGE_NEW_PRODUCT:
      return {
        ...state,
        meals: action.item
      };
    default:
      return state;
  }
};

const PRODUCT_STATE = {
  products: []
};

const productReducer = (state = PRODUCT_STATE, action) => {
  switch (action.type) {
    case types.ADD_NEW_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.item]
      };
    case types.RESET_PRODUCT:
      return {
        ...state,
        products: []
      };
    default:
      return state;
  }
};

export { mealReducer, productReducer };
