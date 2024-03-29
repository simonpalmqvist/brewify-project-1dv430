/**
 * @description Input component for recipes editable values
 * @author simonpalmqvist
 */

import React from "react";
import classNames from "classNames";

export default class Select extends React.Component {
    constructor(props) {
        super(props);

        //Set initial state
        this.state = {value: props.value};
    }
    componentWillReceiveProps(props) {
        //If updates to the prop comes from the server, set new state value
        if (props.value !== this.state.value) {
            this.setState({ value: props.value});
        }
    }

    onChange(event) {
        const {name, onUpdate, value} = this.props;
        const newValue = event.target.value;

        //Only update if value actually changes
        if (newValue != value) {
            this.setState({
                value: newValue
            });

            //Connect the value to key
            let update = {};
            update[name] = newValue;

            //Update recipe with this value
            onUpdate(update);
        }
    }

    render() {
        let labelEl;
        const { name, valToText, options, className, label, id } = this.props;
        const { value } = this.state;

        const classes = classNames("c-select", className);

        const optionsElements = Object.keys(options).map((key) => (
            <option key={key} value={options[key]}>{valToText(options[key])}</option>
        ));

        //Write out label if needed
        if (label) {
            labelEl = (<label className="c-select-label" htmlFor={id}>{label}</label>);
        }

        return (
            <div>
                {labelEl}
                <select name={name} className={classes} id={id} onChange={this.onChange.bind(this)} value={value}>
                    {optionsElements}
                </select>
            </div>
        );
    }
}

Select.defaultProps = {
    onUpdate() {},
    valToText(key) { return key; },
    options: {}
};