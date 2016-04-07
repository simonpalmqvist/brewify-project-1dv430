/**
 * @description Test item component
 * @author simonpalmqvist
 */

import React from "react";

export default class Item extends React.Component {

    render() {
        return (
            <li>{this.props.item}</li>
        );
    }
}