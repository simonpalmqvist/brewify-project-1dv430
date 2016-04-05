/**
 * @description Logout component
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import React from "react";
import { browserHistory } from "react-router";
import AuthStore from "../../stores/AuthStore";
import { logout } from "../../actions/AuthActions";

export default class Logout extends React.Component {
    componentWillMount() {
        logout();
        AuthStore.on("logout", this.redirectToStart);
    }

    componentWillUnmount() {
        AuthStore.removeListener("logout", this.redirectToStart);
    }

    redirectToStart() {
        browserHistory.push("/");
    }

    render() {
        return (<div className="logout">Logging out</div>);
    }
}




