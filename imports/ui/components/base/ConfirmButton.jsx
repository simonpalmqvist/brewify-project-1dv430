/**
 * @description Confirm button to handle actions that requires the user to confirm
 * @author simonpalmqvist
 */

import React from "react";
import classNames from "classNames";

export default class ConfirmButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {confirm: false};
    }

    handleClick() {
        let confirm = false;

        if (this.state.confirm) {
            this.props.action();
        } else {
            confirm = true;

            //iOS fix since onblur doesn't work
            setTimeout(this.handleBlur.bind(this),5000);
        }
        this.setState({confirm});
    }

    handleBlur() {
        this.setState({confirm: false});
    }

    render() {
        const { symbol, text, className } = this.props;
        const { confirm } = this.state;

        let classes = classNames("c-confirm-button", className, {show: confirm});

        return (
            <button
                className={classes}
                onClick={this.handleClick.bind(this)}
                onBlur={this.handleBlur.bind(this)}>
                {confirm ? text : symbol}
            </button>
        );
    }
}

ConfirmButton.defaultProps = {
    action() {}
};