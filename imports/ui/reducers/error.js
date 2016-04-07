export default function error(state, action) {
    switch (action.type) {
        case "ERROR":
            return action.error;
            break;
        default:
            return {};
    }
}