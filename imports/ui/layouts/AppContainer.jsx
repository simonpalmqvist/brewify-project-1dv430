/**
 * @description Main layout component for application
 * @author simonpalmqvist
 */

import React from "react";

import NavigationBar from "../components/navigation/NavigationBar";

export default class AppContainer extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <h1>ooh</h1>
                    <NavigationBar/>
                </header>
                {this.props.children}
            </div>
        );
    }
}