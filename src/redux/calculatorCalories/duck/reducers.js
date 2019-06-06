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

const sumProductsReducer = (state = SUM_PRODUCTS_STATE, action) => {
  console.log(state);
  switch (action.type) {
    case types.SUM_PRODUCTS:
      console.log(action.item);
      console.log(state);
      console.log(state.sumOfElements.calories + action.item.numberOfCalories);
      return {
        ...state,
        sumOfElements: {
          calories: state.calories + action.item.numberOfCalories,
          proteins: state.proteins + action.item.numberOfProteins,
          carbohydrates:
            state.carbohydrates + action.item.numberOfCarbohydrates,
          fats: state.fats + action.item.numberOfFats
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

export { newProductReducer, allProductsReducer, sumProductsReducer };
