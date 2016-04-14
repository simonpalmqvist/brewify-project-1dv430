/**
 * @description Loading reducer to keep track if application is waiting on data from the server
 * @author simonpalmqvist
 */

export default function loading(state = {status: false}, action = {}) {
    switch (action.type) {
        case "LOADING":
            return {status: action.status};
            break;
        default:
            return state;
    }
}