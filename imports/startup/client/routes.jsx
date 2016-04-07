/**
 * @description Initializing react router on startup
 * @author simonpalmqvist
 */

//Modules
import { Meteor } from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, IndexRoute, browserHistory } from "react-router";

//Services
import { alreadyLoggedIn, loggedIn } from "../../ui/services/authorization";

//Layouts
import AppContainer from "../../ui/layouts/AppContainer";

//Pages
import Main from "../../ui/pages/Main";
import Dashboard from "../../ui/pages/Dashboard";
import NotFound from "../../ui/pages/NotFound";

//Components
import Register from "../../ui/components/auth/Register";
import Login from "../../ui/components/auth/Login";
import Logout from "../../ui/components/auth/Logout";

Meteor.startup(() => {
    //Subscribe to the data sources
    Meteor.subscribe("items");

    ReactDOM.render(
        <Router history={browserHistory}>
            <Route path="/" component={AppContainer}>
                <IndexRoute component={Main} onEnter={alreadyLoggedIn}/>
                <Route path="/login" component={Login} onEnter={alreadyLoggedIn}/>
                <Route path="/register" component={Register} onEnter={alreadyLoggedIn}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/dashboard" component={Dashboard} onEnter={loggedIn}/>
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>,
        document.getElementById("app"));
});