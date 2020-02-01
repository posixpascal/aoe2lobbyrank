/* eslint-disable */
import { combineReducers } from "redux";
import lobbiesReducer from "./lobbies.reducer";

const rootReducer = combineReducers({
    lobbies: lobbiesReducer
});

export default rootReducer;
