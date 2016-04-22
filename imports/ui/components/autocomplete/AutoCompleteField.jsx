/**
 * @description Field component used by AutoComplete component
 * @author simonpalmqvist
 */

import React from "react";

export default class AutoComplete extends React.Component {
    constructor(props) {
        super(props);
    }


    onClick(event) {
        event.preventDefault();

        const {onClick} = this.props;

        //Call parent on click method with self
        onClick(this);
    }

    render() {
        const { obj, onMouseDown, selected } = this.props;

        let className = "c-autocomplete-field";
        let style = {display: "block"};

        if (selected) {
            className += " c-autocomplete-selected";
            style.backgroundColor = "lightgrey";
        }

        return (
            <a href="#" onClick={this.onClick.bind(this)}
               onMouseDown={onMouseDown} style={style} className={className}>
                <div>
                    {obj.name}
                </div>
            </a>
        );
    }
}
