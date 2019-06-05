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

export default newProductReducer;
