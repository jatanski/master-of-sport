import types from "./types";

const addNewMeal = item => ({ type: types.ADD_NEW_MEAL, item });
const resetNewMeal = () => ({ type: types.RESET_NEW_MEAL });

export default {
  addNewMeal,
  resetNewMeal
};
