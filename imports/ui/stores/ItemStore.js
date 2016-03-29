import { EventEmitter } from "events";
import Dispatcher from "../dispatcher";

class ItemStore extends EventEmitter {
    constructor() {
        super();

        this.list = ["ooh"];
    }

    getList() {
        return this.list;
    }

    addItem(item) {
        this.list.push(item);

        this.emit("change");
    }

    handleActions(action) {
        switch (action.type) {
        case "ADD_ITEM":
            this.addItem(action.text);
            break;
        }
    }
}

const itemStore = new ItemStore();

Dispatcher.register(itemStore.handleActions.bind(itemStore));

export default itemStore;