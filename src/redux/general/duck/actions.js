import types from "./types";

const login = item => ({ type: types.LOG_IN, item });
const logout = item => ({ type: types.LOG_OUT, item });

export default {
  login,
  logout
};
