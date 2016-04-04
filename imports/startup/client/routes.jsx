
import { Meteor } from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, IndexRoute, browserHistory } from "react-router";


import AppContainer from "../../ui/layouts/AppContainer";
import Main from "../../ui/pages/Main";

import NotFound from "../../ui/pages/NotFound";
import Register from "../../ui/components/auth/Register";

Meteor.startup(() => {
    Meteor.subscribe("items");

    ReactDOM.render(
        <Router history={browserHistory}>
            <Route path="/" component={AppContainer}>
                <IndexRoute component={Main}/>
                <Route path="/register" component={Register}/>
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>,
        document.getElementById("app"));
});