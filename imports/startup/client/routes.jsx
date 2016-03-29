

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, IndexRoute, browserHistory } from "react-router";

import AppContainer from "../../ui/layouts/AppContainer.jsx";
import Main from "../../ui/pages/Main.jsx";
import NotFound from "../../ui/pages/NotFound.jsx";

Meteor.startup(() => {
    ReactDOM.render(
        <Router history={browserHistory}>
            <Route path="/" component={AppContainer}>
                <IndexRoute component={Main}/>
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>,
        document.getElementById("app"));
});