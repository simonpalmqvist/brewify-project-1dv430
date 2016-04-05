import { Meteor } from "meteor/meteor";
import { EventEmitter } from "events";
import Dispatcher from "../dispatcher";

import { Items } from "../../api/items/Items";

class ItemStore extends EventEmitter {
    constructor() {
        super();

        //Listen for changes on items
        Items.find({}).observe({added: () => this.emit("change")});
    }

    getList() {
        return Items.find({}).fetch();
    }

    addItem(text) {
        Meteor.call("items.insert", text, () => this.emit("change"));
    }

    handleActions(action) {
        //Handle actions from dispatcher
        switch (action.type) {
            case "ADD_ITEM":
                this.addItem(action.text);
                break;
        }
    }
}

//Create item store
const itemStore = new ItemStore();

//Register actions
Dispatcher.register(itemStore.handleActions.bind(itemStore));

export default itemStore;