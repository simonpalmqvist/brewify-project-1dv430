/**
 * @description Dashboard page, main page for authenticated users
 * @author simonpalmqvist
 */

import React from "react";
import ReactDOM from "react-dom";
import { createContainer } from "meteor/react-meteor-data";
import { connect }  from "react-redux";

import { Items } from "../../api/items/Items";
import { addItem } from "../actions/ItemActions";

import Item from  "../components/Item";


class Dashboard extends React.Component {

    handle(event) {
        //Find element
        const input = ReactDOM.findDOMNode(event.target);

        //Check if enter was pressed
        if (event.key === "Enter" && input.value) {
            addItem(input.value);

            //Empty field
            input.value = "";
        }
    }

    render() {
        const { items, itemsAdded } = this.props;

        //Create list items from items list
        const listEl = items.map((item) => (<Item key={item._id} item={item.text}/>));

        return (
            <div>
                <h2>Items added: {itemsAdded}</h2>
                <input type="text" onKeyPress={this.handle.bind(this)} />
                <ul className="list-items">{listEl}</ul>
            </div>
        );
    }
}

//Creates meteor container to provide subscribed data
const DashboardContainer = createContainer(() => ({items: Items.find({}).fetch()}), Dashboard);

//Map the current state to the properties in component
function mappingStateToProps(state) {
    return {
        itemsAdded: state.itemsAdded
    };
}

export default connect(mappingStateToProps)(DashboardContainer);
