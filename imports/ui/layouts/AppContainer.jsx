/**
 * @description Main layout component for application
 * @author simonpalmqvist
 */

import React from "react";
import { Link } from "react-router";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import { windowResize } from "../actions/browserActions";
import NavigationBar from "../components/navigation/NavigationBar";

export default class AppContainer extends React.Component {

    handleWindowChange() {
        console.log(window.innerWidth);
        windowResize(window.innerWidth);
    }

    componentWillMount() {
        this.handleWindowChange();
        window.addEventListener("resize", this.handleWindowChange);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowChange);
    }

    render() {

        //Decide in which direction to pageslide
        const pathname = this.props.location.pathname;
        const transitionName = pathname === "/" || pathname === "/dashboard" ? "app-right" : "app-left";

        return (
            <div>
                <header className="main-header">
                    <div className="wrapper">
                        <Link to="/"><img className="logo" src="/logo.png" alt="Brewify"/></Link>
                        <NavigationBar/>
                    </div>
                </header>
                <div className="wrapper">
                    <ReactCSSTransitionGroup
                        component="div"
                        transitionName={transitionName}
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}>
                        {React.cloneElement(this.props.children, {
                            key: this.props.location.pathname
                        })}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        );
    }
}