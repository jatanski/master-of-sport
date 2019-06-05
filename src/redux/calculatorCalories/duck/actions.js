import types from "./types";

const sendInfo = item => ({ type: types.SEND_INFO, item });
const resetInfo = item => ({ type: types.RESET_INFO, item });

export default {
  sendInfo,
  resetInfo
};
