/**
 * @description Input component for recipes editable values
 * @author simonpalmqvist
 */

import React from "react";

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: props.value};
    }

    componentWillReceiveProps(props) {
        //If updates to the prop comes from the server, set new value
        if (props.value !== this.state.value) {
            this.setState({ value: props.value});
        }
    }

    finishedEditing() {
        const {name, updateFun, value} = this.props;
        const newValue  = this.state.value;

        //Only update if something actually changes
        if (newValue !== value) {
            //Connect the value to key
            let update = {};
            update[name] = this.state.value;

            //Update recipe with this value
            updateFun(update);
        }

    }

    onChange(event) {
        //Just update the state when changing the input
        this.setState({value: event.target.value});
    }

    onEnter(event) {
        if (event.key === "Enter") {
            event.target.blur();
        }
    }

    render() {
        const { title, name, type} = this.props;
        const { value } = this.state;

        let label;

        if (title) {
            label = (<label for={name}>{title}</label>);
        }

        return (
            <div>
                {title}
                <input ref="input"
                       name="name"
                       type={type}
                       value={value}
                       onChange={this.onChange.bind(this)}
                       onKeyPress={this.onEnter.bind(this)}
                       onBlur={this.finishedEditing.bind(this)}/>
            </div>
        );
    }
}