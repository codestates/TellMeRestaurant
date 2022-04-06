import { ADD_TO_POST, DELETE_FROM_POST } from "../actions/index";
import { initialState } from "./initialState";

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_POST:
      break;

    case DELETE_FROM_POST:
      break;

    default:
      return state;
  }
};

export default postReducer;
