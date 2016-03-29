import React from "react";
import ReactDOM from "react-dom";

import * as ItemActions from "../actions/ItemActions";
import ItemStore from "../stores/ItemStore";
import Item from  "../components/Item";

export default class Main extends React.Component {
    constructor() {
        super();

        this.getList = this.getList.bind(this);
        this.state = {
            list: ItemStore.getList()
        };
    }

    componentWillMount() {
        ItemStore.on("change", this.getList);
    }

    componentWillUnmount() {
        ItemStore.removeListener("change", this.getList);
    }

    getList() {
        this.setState({list: ItemStore.getList()});
    }

    handle(event) {
        //Get state
        const list = this.state.list;
        //Find element
        const input = ReactDOM.findDOMNode(event.target);

        //Check if enter was pressed
        if (event.key === "Enter" && input.value) {
            ItemActions.addItem(input.value);

            //Empty field
            input.value = "";
        }
    }

    render() {
        const { list } = this.state;

        const listEl = list.map((item, i) => (<Item key={i} item={item}/>));

        return (
            <div>
                <h2>This is the home view</h2>
                <input type="text" onKeyPress={this.handle.bind(this)} />
                <ul>{listEl}</ul>
            </div>
        );
    }
}