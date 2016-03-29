import Dispatcher from "../dispatcher";

export function addItem(text) {
    Dispatcher.dispatch({
        type: "ADD_ITEM",
        text
    });
}