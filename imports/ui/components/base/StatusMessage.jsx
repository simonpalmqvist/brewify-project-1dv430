/**
 * @description AuthForm component for validating user input before trying to create/login user
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import React from "react";
import classNames from "classNames";

import { removeMessage } from "../../actions/StatusActions";

import { connect }  from "react-redux";

class StatusMessage extends React.Component {

    constructor() {
        super();
    }

    render() {
        const { flashMessages } = this.props;

        let flashMessage;
        let content;
        let classes = "c-status-message";

        if (flashMessages.save) {
            classes = classNames(classes, "save");
            flashMessage = (<p>Updates are saved</p>);
        } else if (flashMessages.saving) {
            classes = classNames(classes, "saving");
            flashMessage = (<p>Saving updates</p>);
        } else if (flashMessages.error) {
            classes = classNames(classes, "error");
            flashMessage = (<p>{flashMessages.error.reason}</p>);
        }

        if (flashMessage) {
            classes = classNames(classes, "active");
            content = (
                <div>
                    {flashMessage}
                    <button onClick={removeMessage}>×</button>
                </div>
            );
        }

        return (
            <div className={classes}>
                {content}
            </div>
        );
    }
}


//Map the current state to the properties in component
export default connect(({flashMessages}) => ({flashMessages}))(StatusMessage);



