import types from "./types";

const addMeal = item => ({ type: types.ADD_MEAL, item });
const addNewProduct = item => ({ type: types.ADD_NEW_PRODUCT, item });
const changeNewProduct = item => ({ type: types.CHANGE_NEW_PRODUCT, item });
const resetProduct = () => ({ type: types.RESET_PRODUCT });

export default {
  addMeal,
  addNewProduct,
  changeNewProduct,
  resetProduct
};
