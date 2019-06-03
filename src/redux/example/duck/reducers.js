import types from "./types";

const INITIAL_STATE = {
  listName: "Example list",
  list: ["Example 1", "Example 2", "Example 3"]
};

const exampleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ADD_EXAMPLE:
      return {
        ...state,
        list: [...state.list, action.item]
      };
    case types.RESET_EXAMPLE:
      return {
        ...state,
        list: []
      };
    default:
      return state;
  }
};

export default exampleReducer;
