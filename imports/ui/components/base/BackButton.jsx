/**
 * @description AuthForm component for validating user input before trying to create/login user
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import React from "react";
import classNames from "classNames";
import { connect }  from "react-redux";

import { removeBackButton } from "../../actions/NavigationActions";

import { Link } from "react-router";

class BackButton extends React.Component {

    render() {
        const { backUrl } = this.props.navigation;

        let classes = "c-back-button";
        let element;

        //Show back arrow if state has a back url
        if (backUrl) {
            element = (<Link to={backUrl} onClick={removeBackButton}>❮</Link>);
        }

        return (
            <div className={classes}>
                {element}
            </div>
        );
    }
}

//Map the current state to the properties in component
export default connect(({navigation}) => ({navigation}))(BackButton);



