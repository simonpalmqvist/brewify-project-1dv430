/**
 * @description Main layout component for application
 * @author simonpalmqvist
 */

import React from "react";
import { Link } from "react-router";

import NavigationBar from "../components/navigation/NavigationBar";

export default class AppContainer extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <Link to="/"><h1>ooh</h1></Link>
                    <NavigationBar/>
                </header>
                {this.props.children}
            </div>
        );
    }
}