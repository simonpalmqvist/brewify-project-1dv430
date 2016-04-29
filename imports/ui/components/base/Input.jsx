/**
 * @description Input component for recipes editable values
 * @author simonpalmqvist
 */

import React from "react";
import classNames from "classNames";

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
            update[name] = newValue;

            //Update recipe with this value
            onUpdate(update);
        }

    }

    maybeToFixed(value) {
        const { attr, fixedDecimals } = this.props;

        //If attribute type is number the set to fixed (default 0)
        if (value !== "" && attr.type === "number") {
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

    handleChange(event) {
        let { value } = event.target;
        let checkValue;
        const {onChange, validate, name} = this.props;

        //Maybe parse value before running validation
        checkValue = this.maybeParseFloat(value);

        if (!value || validate(name, checkValue)) {
            //Just update the state when changing the input
            this.setState({value});
            //call onChange callback
            onChange(checkValue);
        }
    }

    onEnterKeyPress(event) {
        //Blur input on enter
        if (event.key === "Enter") {
            event.target.blur();
        }
    }

    render() {
        const { label, name, attr, className} = this.props;
        const { value } = this.state;

        let labelEl;
        let classes = classNames("c-input", className);


        //Write out label if needed
        if (label) {
            labelEl = (<label className="c-input-label" htmlFor={attr.id}>{label}</label>);
        }

        return (
            <div>
                {labelEl}
                <input ref="input"
                       className={classes}
                       name={name}
                       value={value}
                       {...attr}
                       onChange={this.handleChange.bind(this)}
                       onKeyPress={this.onEnterKeyPress.bind(this)}
                       onBlur={this.finishedEditing.bind(this)}/>
            </div>
        );
    }
}

Input.defaultProps = {
    onChange() {},
    onUpdate() {},
    validate() {return true;},
    attr: {},
    value: "",
    fixedDecimals: 0
};