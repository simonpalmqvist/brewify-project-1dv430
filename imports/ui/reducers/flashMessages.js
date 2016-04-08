/**
 * @description Error reducer for changing the error state, can be picked up by forms or other pages
 * @author simonpalmqvist
 */

export default function flashMessages(state, action) {
    switch (action.type) {
        case "SAVE":
            return {save: {}};
            break;
        case "ERROR":
            return {error: action.error};
            break;
        default:
            return {};
    }
}