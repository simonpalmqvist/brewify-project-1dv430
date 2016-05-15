/**
 * @description Navigation reducer to provide navigation
 * @author simonpalmqvist
 */

export default function navigation(state = {}, action = {}) {
    switch (action.type) {
        case "BACK_BUTTON":
            return {
                backButton: {
                    url: action.url,
                    text: action.text
                }
            };
            break;
        case "REMOVE_BACK_BUTTON":
            return {};
            break;
        default:
            return state;
    }
}