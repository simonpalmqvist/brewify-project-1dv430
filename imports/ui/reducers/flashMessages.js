/**
 * @description Error reducer for changing the error state, can be picked up by forms or other pages
 * @author simonpalmqvist
 */

export default function flashMessages(state = {}, action = {}) {
    switch (action.type) {
        case "SAVE_MESSAGE":
            return {save: true};
            break;
        case "SAVING_MESSAGE":
            return {saving: true};
            break;
        case "ERROR_MESSAGE":
            return {error: action.error};
            break;
        case "REMOVE_MESSAGE":
            return {};
            break;
        default:
            return state;
    }
}