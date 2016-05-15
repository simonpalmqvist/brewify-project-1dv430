/**
 * @description Flash message reducer for displaying and removing error / save messages throughout the application
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