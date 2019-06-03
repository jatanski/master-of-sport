import types from "./types";

const add = item => ({ type: types.ADD_EXAMPLE, item });
const reset = item => ({ type: types.RESET_EXAMPLE, item });

export default {
  add,
  reset
};
