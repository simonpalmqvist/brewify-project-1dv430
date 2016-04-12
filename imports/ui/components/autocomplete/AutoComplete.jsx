/**
 * @description AutoComplete component for getting value from provided data source
 * @author simonpalmqvist
 */

import React from "react";

import AutoCompleteField from "./AutoCompleteField";

export default class AutoComplete extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            listOpen: props.listOpen || false,
            selected: 0,
            value: props.value || ""
        };

        //Private properties to decide whether blur from input and if action should be taken on blur
        //Used instead of state properties because state might not be updated when information is used
        this._shouldHandleAction = false;
        this._shouldBlur = true;
    }

    static sortNameAscending(a, b) {
        let result = 0;

        if (a.name < b.name) {
            result = -1;
        } else if (a.name > b.name) {
            result = 1;
        }

        return result;
    }

    componentWillReceiveProps(props) {
        //If updates to the prop comes from the server, set new state value
        if (props.value !== this.state.value) {
            this.setState({ value: props.value});
        }
    }

    showList() {
        this.setState({listOpen: true});
    }


    list() {
        const { data } = this.props;
        const { selected } = this.state;
        const filter = this.state.value.toLowerCase();


        //Filter list based on inputs value, sort list and map values to div
        return data
            .filter(({name}) => name.toLowerCase().includes(filter))
            .sort(AutoComplete.sortNameAscending)
            .map((obj, i) => (
                <AutoCompleteField
                    onClick={this.onClick.bind(this)}
                    onMouseDown={() => this._shouldBlur = false}
                    selected={i === selected}
                    ref={`child-${i}`}
                    key={obj.id}
                    obj={obj}/>
            ));
    }

    handleAction(field) {
        const { onSelected} = this.props;
        let value = this.props.value || "";

        //If field exists and function should handle action update value and run callback
        if (field && this._shouldHandleAction) {
            value = field.props.obj.name;
            onSelected(null, field.props.obj);
        } else if (this._shouldHandleAction) {
            onSelected({reason: `'${value}' can't be found`});
        }

        //Reset state and properties when action is done
        this._shouldHandleAction = false;
        this._shouldBlur = true;
        this.setState({value, listOpen: false, selected: 0});
        this.props.onExit();
    }

    onClick(field) {
        //Handle action for clicked element
        this._shouldHandleAction = true;

        this.handleAction(field);
    }

    onChange(event) {
        //Just update the state when changing the input
        this.setState({value: event.target.value, selected: 0});
    }

    onKeyDown(event) {
        //Get selected items index and possible max index
        let { selected } = this.state;
        let max = this.refs.list.children.length - 1;

        //Handle key events
        switch(event.key) {
            case "Enter":
                this._shouldHandleAction = true;
                event.target.blur();
                break;
            case "Escape":
                event.target.blur();
                break;
            case "ArrowUp":
                this.setState({selected: selected === 0 ? 0 : selected - 1});
                break;
            case "ArrowDown":
                this.setState({selected: selected === max ? max : selected + 1});
                break;
        }
    }

    onBlur(event) {
        //If event should not blur (possible mouse events) then prevent default
        if (this._shouldBlur) {
            //Find field based on selected value
            let field = this.refs[`child-${this.state.selected}`];
            this.handleAction(field);
        } else {
            event.preventDefault();
        }
    }

    render() {
        const { value, listOpen } = this.state;
        let menu;

        //Component specific styles for list
        let listStyle = {
            border: "1px solid grey",
            position: "fixed",
            overflow: "auto",
            maxHeight: "50%"
        };

        //Generate list if list should be shown
        if (listOpen) {
            menu = (
                <div ref="list"
                     style={listStyle}
                     className="autocomplete-list">
                    {this.list()}
                </div>
            );
        }

        return (
            <div>
                <input ref="input"
                       type="text"
                       value={value}
                       onFocus={this.showList.bind(this)}
                       onChange={this.onChange.bind(this)}
                       onKeyDown={this.onKeyDown.bind(this)}
                       onBlur={this.onBlur.bind(this)}/>
                {menu}
            </div>
        );
    }
}

AutoComplete.defaultProps = {onSelected() {}, onExit() {}};