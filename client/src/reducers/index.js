import { combineReducers } from "redux"; //통합할 관리할 reducer
import hashtagReducer from "./hashtagReducer"; // 첫번쨰
import postReducer from "./postReducer"; //두번째 reducer

const rootReducer = combineReducers({
  hashtagReducer, //바뀔 상태를 넣는다.
  postReducer,
});

export default rootReducer;
