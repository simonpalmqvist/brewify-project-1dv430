/**
 * @description Initializing react router on startup
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, IndexRoute, browserHistory } from "react-router";

import { alreadyLoggedIn, loggedIn } from "../../ui/services/authorization";
import AppContainer from "../../ui/layouts/AppContainer";
import Main from "../../ui/pages/Main";
import Dashboard from "../../ui/pages/Dashboard";
import NotFound from "../../ui/pages/NotFound";
import Register from "../../ui/components/auth/Register";
import Login from "../../ui/components/auth/Login";

Meteor.startup(() => {
    Meteor.subscribe("items");

    ReactDOM.render(
        <Router history={browserHistory}>
            <Route path="/" component={AppContainer}>
                <IndexRoute component={Main}/>
                <Route path="/login" component={Login} onEnter={alreadyLoggedIn}/>
                <Route path="/register" component={Register} onEnter={alreadyLoggedIn}/>
                <Route path="/dashboard" component={Dashboard} onEnter={loggedIn}/>
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>,
        document.getElementById("app"));
});