import { compose, createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
// import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;
const store = createStore(
  rootReducer
  //   composeEnhancers(applyMiddleware()) //리덕스 미들웨어 리덕스 앱에서 side-effect 처리시 사용
);

export default store;

// 무슨기능인가 상태를 reducer index에 넘기는 역할
