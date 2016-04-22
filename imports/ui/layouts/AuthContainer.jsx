/**
 * @description Main layout component for application
 * @author simonpalmqvist
 */

import React from "react";
import { Link } from "react-router";

export default class AuthContainer extends React.Component {

    render() {
        return (
            <div className="modal-wrapper auth">
                <div>
                    <Link to="/">
                        <img className="logo" src="/logo.png" alt="Brewify"/>
                    </Link>
                    <div className="content-box">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}