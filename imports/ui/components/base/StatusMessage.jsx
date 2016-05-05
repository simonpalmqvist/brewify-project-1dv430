/**
 * @description AuthForm component for validating user input before trying to create/login user
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import React from "react";

import { connect }  from "react-redux";

class StatusMessage extends React.Component {

    constructor() {
        super();
    }

    render() {
        const { flashMessages } = this.props;

        let flashMessage;

        if (flashMessages.save) {
            flashMessage = (<p>Saved</p>);
        } else if (flashMessages.saving) {
            flashMessage = (<p>Saving</p>);
        } else if (flashMessages.error) {
            flashMessage = (<p>Error: {flashMessages.error.reason}</p>);
        }

        return (
            <div className="wrapper">
                {flashMessage}
            </div>
        );
    }
}


//Map the current state to the properties in component
export default connect(({flashMessages}) => ({flashMessages}))(StatusMessage);



