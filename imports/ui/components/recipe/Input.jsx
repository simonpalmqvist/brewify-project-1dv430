/**
 * @description Input component for recipes editable values
 * @author simonpalmqvist
 */

import React from "react";

export default class Input extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {value: this.maybeToFixed(props.value)};
    }

    componentWillReceiveProps(props) {
        //If updates to the prop comes from the server, set new state value
        if (props.value !== this.state.value) {
            this.setState({ value: this.maybeToFixed(props.value)});
        }
    }

    finishedEditing() {
        const {name, onUpdate, value} = this.props;

        //Maybe parse it to be able to match it against property value
        const newValue = this.maybeParseFloat(this.state.value);

        //Only update if something actually changes, if no value is present set it back to prop
        if (newValue === "") {
            this.setState({value});
        } else if (newValue !== value) {
            //Connect the value to key
            let update = {};
            update[name] = this.state.value;

            //Update recipe with this value
            onUpdate(update);
        }

    }

    maybeToFixed(value) {
        const { attr, fixedDecimals } = this.props;

        //If attribute type is number the set to fixed (default 0)
        if (attr.type === "number") {
            value = value.toFixed(fixedDecimals);
        }
        return value;
    }

    maybeParseFloat(value) {
        const { attr } = this.props;

        //Parse number if attr type is number
        if (value && attr.type === "number") {
            value = parseFloat(value);
        }

        return value;
    }

    onChange(event) {
        let { value } = event.target;
        const {validate, name} = this.props;

        value = this.maybeParseFloat(value);

        if (!value || validate(name, value)) {
            //Just update the state when changing the input
            this.setState({value: this.maybeToFixed(value)});
        }
    }

    onEnterKeyPress(event) {
        //Blur input on enter
        if (event.key === "Enter") {
            event.target.blur();
        }
    }

    render() {
        const { label, name, attr} = this.props;
        const { value } = this.state;

        let labelEl;

        //Write out label if needed
        if (label) {
            labelEl = (<label>{label}</label>);
        }

        return (
            <div>
                {labelEl}
                <input ref="input"
                       name={name}
                       value={value}
                       {...attr}
                       onChange={this.onChange.bind(this)}
                       onKeyPress={this.onEnterKeyPress.bind(this)}
                       onBlur={this.finishedEditing.bind(this)}/>
            </div>
        );
    }
}

Input.defaultProps = {
    onUpdate() {},
    validate() {return true;},
    attr: {},
    value: "",
    fixedDecimals: 0
};