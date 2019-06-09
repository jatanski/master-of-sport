import types from "./types";

const sendInfo = item => ({ type: types.SEND_INFO, item });
const resetInfo = item => ({ type: types.RESET_INFO, item });

const addProduct = item => ({ type: types.ADD_PRODUCT, item });
const sumProducts = item => ({ type: types.SUM_PRODUCTS, item });

const sumMeals = item => ({ type: types.SUM_MEALS, item });

export default {
  sendInfo,
  resetInfo,
  addProduct,
  sumProducts,
  sumMeals
};
