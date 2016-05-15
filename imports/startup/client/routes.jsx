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
import { subscribeAll } from "../../ui/actions/SubscribeActions.js";
import { recipeExists } from "../../ui/actions/RecipeActions";
import { removeMessage } from "../../ui/actions/StatusActions";
import { showBackButton, removeBackButton } from "../../ui/actions/NavigationActions";
import Store from "../../ui/store";

//Layouts
import AppContainer from "../../ui/layouts/AppContainer";
import AuthContainer from "../../ui/layouts/AuthContainer";

//Pages
import Main from "../../ui/pages/Main";
import Dashboard from "../../ui/pages/Dashboard";
import Recipe from "../../ui/pages/Recipe";
import BrewProfile from "../../ui/pages/BrewProfile";
import NotFound from "../../ui/pages/NotFound";

//Components
import Register from "../../ui/components/auth/Register";
import Login from "../../ui/components/auth/Login";
import Logout from "../../ui/components/auth/Logout";

Meteor.startup(() => {
    function onPageChange() {
        //This refers to Router component in this scope
        const location = this.state.location.pathname;

        window.scrollTo(0, 0);

        if (location.startsWith("/recipe/")) {
            showBackButton("/dashboard", "Back");
        } else if (location.startsWith("/brew/profile")) {
            showBackButton("/dashboard", "Done");
        } else {
            removeBackButton();
        }
        removeMessage();
    }

    //Subscribe to publications if user is logged in
    subscribeAll();

    //Sync route history with store
    const hist = syncHistoryWithStore(browserHistory, Store);


    //Defined routes and eventual handlers for checking authorization
    ReactDOM.render(
        <Provider store={Store}>
            <Router onUpdate={onPageChange} history={hist}>
                <Route component={AuthContainer}>
                    <Route path="/login" component={Login} onEnter={alreadyLoggedIn}/>
                    <Route path="/register" component={Register} onEnter={alreadyLoggedIn}/>
                    <Route path="/logout" component={Logout}/>
                </Route>
                <Route path="/" component={AppContainer}>
                    <IndexRoute component={Main} onEnter={alreadyLoggedIn}/>
                    <Route path="/dashboard" component={Dashboard} onEnter={loggedIn}/>
                    <Route path="/recipe/:id" component={Recipe} onEnter={recipeExists}/>
                    <Route path="/brew/profile" component={BrewProfile} onEnter={loggedIn}/>
                    <Route path="*" component={NotFound}/>
                </Route>
            </Router>
        </Provider>,
        document.getElementById("app")
    );
});