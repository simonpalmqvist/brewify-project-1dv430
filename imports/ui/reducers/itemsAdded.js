export default function itemsAdded(state = 0, action = {}) {
    switch (action.type) {
        case "ADDED_ITEMS":
            return state + 1;
        default:
            return state;
    }
};