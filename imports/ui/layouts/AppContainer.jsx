/**
 * @description Main layout component for application
 * @author simonpalmqvist
 */

import React from "react";
import { Link } from "react-router";

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
        return (
            <div>
                <header className="main-header">
                    <div className="wrapper">
                        <Link to="/"><img className="logo" src="/logo.png" alt="Brewify"/></Link>
                        <NavigationBar/>
                    </div>
                </header>
                <div className="wrapper">
                    {this.props.children}
                </div>
            </div>
        );
    }
}