/**
 * @description Logout component
 * @author simonpalmqvist
 */

//Modules
import { Meteor } from "meteor/meteor";
import React from "react";

//Actions
import { logoutUser } from "../../actions/AuthActions";

export default class Logout extends React.Component {
    componentWillMount() {
        logoutUser();
    }

    render() {
        return (<div className="logout">Logging out</div>);
    }
}




