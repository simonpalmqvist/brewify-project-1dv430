/**
 * @description browser reducer to keep track on dimensions and other stuff concerning the browser
 * @author simonpalmqvist
 */

export default function browser(state = {mobile: false}, action = {}) {
    switch (action.type) {
        case "WINDOW_RESIZE":
            return {mobile: action.mobile};
            break;
        default:
            return state;
    }
}