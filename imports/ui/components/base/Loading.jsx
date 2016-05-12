/**
 * @description AuthForm component for validating user input before trying to create/login user
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import React from "react";
import classNames from "classNames";

import { connect }  from "react-redux";

class Loading extends React.Component {

    render() {
        const { loading, imgSrc} = this.props;

        let classes = "c-loading";
        let element;

        console.log(loading.status);

        if (loading.status) {
            classes = classNames(classes, "active");
            element = (<div><img src={imgSrc}/></div>);
        }

        return (
            <div className={classes}>
                {element}
            </div>
        );
    }
}

//Map the current state to the properties in component
export default connect(({loading}) => ({loading}))(Loading);



