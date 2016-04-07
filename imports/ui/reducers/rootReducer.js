import { combineReducers } from "redux";
import itemsAdded from "./itemsAdded";
//import auth from "./auth";
import error from "./error";
import { routerReducer } from "react-router-redux";

export default rootReducer = combineReducers({
    itemsAdded,
    error,
    routing: routerReducer
});