/**
 * @description Main layout component for application
 * @author simonpalmqvist
 */

import React from "react";

export default class AppContainer extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <h1>ooh</h1>
                </header>
                {this.props.children}
            </div>
        );
    }
}