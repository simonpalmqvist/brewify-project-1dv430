/**
 * @description Subscription reducer to keep track of subscriptions to Meteor publications
 * @author simonpalmqvist
 */

export default function loading(state = {}, action = {}) {
    switch (action.type) {
        case "SUBSCRIPTION":
            const clone = Object.assign({}, state);
            clone[action.publication] = action.subscription;

            return clone;
            break;
        default:
            return state;
    }
}