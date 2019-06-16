import types from "./types";

const MEAL_STATE = {
  meals: []
};

const mealNewReducer = (state = MEAL_STATE, action) => {
  switch (action.type) {
    case types.ADD_NEW_MEAL:
      return {
        meals: [...state.meals, action.item]
      };
    case types.RESET_NEW_MEAL:
      return {
        meals: []
      };
    default:
      return state;
  }
};

export { mealNewReducer };
