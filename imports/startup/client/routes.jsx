/**
 * @description Initializing react router on startup with redux store
 * @author simonpalmqvist
 */

//Modules
import { Meteor } from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, Link, IndexRoute, browserHistory } from "react-router";
import { syncHistoryWithStore} from "react-router-redux";

//Services
import { alreadyLoggedIn, loggedIn } from "../../ui/actions/AuthActions";
import { recipeExists } from "../../ui/actions/RecipeActions";
import Store from "../../ui/store";

//Layouts
import AppContainer from "../../ui/layouts/AppContainer";

//Pages
import Main from "../../ui/pages/Main";
import Dashboard from "../../ui/pages/Dashboard";
import Recipe from "../../ui/pages/Recipe";
import NotFound from "../../ui/pages/NotFound";

//Components
import Register from "../../ui/components/auth/Register";
import Login from "../../ui/components/auth/Login";
import Logout from "../../ui/components/auth/Logout";

Meteor.startup(() => {
    //Subscribe to the data sources
    Meteor.subscribe("recipes");
    Meteor.subscribe("fermentables");

    //Sync route history with store
    const hist = syncHistoryWithStore(browserHistory, Store);

    ReactDOM.render(
        <Provider store={Store}>
            <Router history={hist}>
                <Route path="/" component={AppContainer}>
                    <IndexRoute component={Main} onEnter={alreadyLoggedIn}/>
                    <Route path="/login" component={Login} onEnter={alreadyLoggedIn}/>
                    <Route path="/register" component={Register} onEnter={alreadyLoggedIn}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/dashboard" component={Dashboard} onEnter={loggedIn}/>
                    <Route path="/recipe/:id" component={Recipe} onEnter={recipeExists}/>
                    <Route path="*" component={NotFound}/>
                </Route>
            </Router>
        </Provider>,
        document.getElementById("app")
    );
});