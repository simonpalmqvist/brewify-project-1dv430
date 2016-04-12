/**
 * @description AutoComplete component for getting value from data source
 * @author simonpalmqvist
 */

import React from "react";

export default class AutoComplete extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {
            listOpen: props.listOpen || false,
            selected: 0,
            filter: null,
            value: props.value || ""
        };

        this._shouldHandleAction = false;
        this._shouldBlur = true;
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
        const selectedClass = (i) => i === selected ? "autocomplete-selected" : "";
        const selectedStyle = (i) => i === selected ? {backgroundColor: "lightgrey"} : {};

        sorter = (a, b) => {
            if (a.name < b.name) {
                return -1;
            } else if (a.name > b.name) {
                return 1;
            } else {
                return 0;
            }

        };

        return data
            .filter(({name}) => name.toLowerCase().includes(filter))
            .sort(sorter)
            .map(({id, name}, i) => (
                <div onClick={this.onClick.bind(this)}
                     onMouseDown={() => this._shouldBlur = false}
                     style={selectedStyle(i)}
                     className={selectedClass(i)}
                     key={id}>{name}
                </div>
            ));
    }

    handleAction(item) {
        const { selected } = this.state;
        const { children } = this.refs.list;

        item = item || children[selected];

        let value = this.props.value || "";

        if (item && this._shouldHandleAction) {
            value = item.textContent;
        }

        this._shouldHandleAction = false;
        this._shouldBlur = true;
        this.setState({value, listOpen: false, selected: 0});
    }

    onClick(event) {
        event.preventDefault();

        this._shouldHandleAction = true;
        this.handleAction(event.target);
    }

    onChange(event) {
        //Just update the state when changing the input
        this.setState({value: event.target.value, selected: 0});
    }

    onKeyDown(event) {
        let { selected } = this.state;
        let max = this.refs.list.children.length - 1;

        switch(event.key) {
            case "Enter":
                this._shouldHandleAction = true;
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
        if (this._shouldBlur) {
            this.handleAction();
        } else {
            event.preventDefault();
        }
    }

    render() {
        const { value, listOpen } = this.state;
        let menu;

        let listStyle = {
            border: "1px solid grey",
            position: "fixed",
            overflow: "auto",
            maxHeight: "50%"
        };

        if (listOpen) {
            menu = (<div ref="list" style={listStyle} className="autocomplete-list">{this.list()}</div>);
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