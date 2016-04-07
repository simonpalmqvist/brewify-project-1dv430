import { combineReducers } from "redux";

function loginError(state, action) {
    switch (action.type) {
        case "LOGIN_ERROR":
            return action.error;
            break;
        default:
            return {};
    }
}

export default auth = combineReducers({
    loginError
});