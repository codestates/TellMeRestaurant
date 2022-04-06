import { ADD_TO_HASHTAG, DELETE_FROM_HASHTAG } from "../actions/index";
import { initialState } from "./initialState";

const hashtagReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_HASHTAG:
      break; //상태가 true라면 try action 작동

    case DELETE_FROM_HASHTAG:
      break;

    default:
      return state;
  }
};

export default hashtagReducer;
