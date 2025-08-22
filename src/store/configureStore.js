import { combineReducers, applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
import sessionReducer from "./sessions/sessionSlice";
import userReducer from "./user/userSlice";

const reducer = combineReducers({
  sessions: sessionReducer,
  user: userReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
