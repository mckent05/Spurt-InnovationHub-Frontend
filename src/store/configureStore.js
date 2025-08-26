import { combineReducers, applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
import sessionReducer from "./sessions/sessionSlice";
import userReducer from "./user/userSlice";
import adminReducer from "./admin/userSlice"
import expertReducer from "./experts/expertSlice"
import hubReducer from "./hubs/hubSlice"
import expertBookingReducer from './expertBooking/expertBookingSlice'

const reducer = combineReducers({
  sessions: sessionReducer,
  user: userReducer,
  adminUsers: adminReducer,
  experts: expertReducer,
  hubs: hubReducer,
  expertBookings: expertBookingReducer
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
