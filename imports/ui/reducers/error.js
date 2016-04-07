/**
 * @description Error reducer for changing the error state, can be picked up by forms or other pages
 * @author simonpalmqvist
 */

export default function error(state, action) {
    switch (action.type) {
        case "ERROR":
            return action.error;
            break;
        default:
            return {};
    }
}