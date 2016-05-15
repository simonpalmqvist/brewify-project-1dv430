/**
 * @description Main layout component for application
 * @author simonpalmqvist
 */

import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import NavigationBar from "../components/navigation/NavigationBar";
import StatusMessage from "../components/base/StatusMessage";
import Loading from "../components/base/Loading";
import BackButton from "../components/base/BackButton";

export default class AppContainer extends React.Component {

    render() {

        //Decide in which direction to pageslide
        const pathname = this.props.location.pathname;
        const transitionName = pathname === "/" || pathname === "/dashboard" ? "app-right" : "app-left";

        return (
            <div>
                <header className="main-header">
                    <div className="wrapper">
                        <BackButton/>
                        <img className="logo" src="/logo.png" alt="Brewify"/>
                        <NavigationBar/>
                    </div>
                </header>
                <StatusMessage />
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
                <Loading imgSrc="/loading.png"/>
            </div>
        );
    }
}