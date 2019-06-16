import types from "./types";

const INITIAL_STATE = {
  info: {
    newProductName: "",
    numberOfProteins: 0,
    numberOfCarbohydrates: 0,
    numberOfFats: 0,
    numberOfCalories: 0,
    weight: 0
  }
};

const PRODUCTS_STATE = {
  products: []
};

const SUM_PRODUCTS_STATE = {
  sumOfElements: {
    calories: 0,
    proteins: 0,
    carbohydrates: 0,
    fats: 0
  }
};

const SUM_MEALS_STATE = {
  calories: 0,
  proteins: 0,
  carbohydrates: 0,
  fats: 0
};

const sumMealsReducer = (state = SUM_MEALS_STATE, action) => {
  switch (action.type) {
    case types.SUM_PRODUCTS:
      return {
        ...state,
        calories: state.calories + action.item.numberOfCalories,
        proteins: state.proteins + action.item.numberOfProteins,
        carbohydrates: state.carbohydrates + action.item.numberOfCarbohydrates,
        fats: state.fats + action.item.numberOfFats
      };
    case types.RESET_SUM_MEALS:
      return {
        calories: 0,
        proteins: 0,
        carbohydrates: 0,
        fats: 0
      };
    default:
      return state;
  }
};

const sumProductsReducer = (state = SUM_PRODUCTS_STATE, action) => {
  switch (action.type) {
    case types.SUM_PRODUCTS:
      return {
        ...state,
        sumOfElements: {
          calories: state.sumOfElements.calories + action.item.numberOfCalories,
          proteins: state.sumOfElements.proteins + action.item.numberOfProteins,
          carbohydrates:
            state.sumOfElements.carbohydrates +
            action.item.numberOfCarbohydrates,
          fats: state.sumOfElements.fats + action.item.numberOfFats
        }
      };
    default:
      return state;
  }
};

const allProductsReducer = (state = PRODUCTS_STATE, action) => {
  switch (action.type) {
    case types.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.item]
      };
    default:
      return state;
  }
};

const newProductReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SEND_INFO:
      return {
        ...state,
        info: action.item
      };
    case types.RESET_INFO:
      return {
        ...state,
        info: {
          newProductName: "",
          numberOfProteins: 0,
          numberOfCarbohydrates: 0,
          numberOfFats: 0,
          numberOfCalories: 0
        }
      };
    default:
      return state;
  }
};

export {
  newProductReducer,
  allProductsReducer,
  sumProductsReducer,
  sumMealsReducer
};
