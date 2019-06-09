import types from "./types";

const INITIAL_STATE = {
  loginStatus: true
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOG_IN:
      return {
        ...state,
        loginStatus: true
      };
    case types.LOG_OUT:
      return {
        ...state,
        loginStatus: false
      };
    default:
      return state;
  }
};

export default loginReducer;
