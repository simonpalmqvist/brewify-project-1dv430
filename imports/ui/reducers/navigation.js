/**
 * @description Navigation reducer to provide navigation
 * @author simonpalmqvist
 */

export default function navigation(state = {}, action = {}) {
    switch (action.type) {
        case "BACK_URL":
            return {backUrl: action.url};
            break;
        case "REMOVE_BACK_URL":
            return {};
            break;
        default:
            return state;
    }
}