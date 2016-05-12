/**
 * @description Main layout component for application
 * @author simonpalmqvist
 */

import React from "react";
import { Link } from "react-router";

import StatusMessage from "../components/base/StatusMessage";
import Loading from "../components/base/Loading";

export default class AuthContainer extends React.Component {

    render() {
        return (
            <div className="modal-wrapper auth">
                <StatusMessage/>
                <div className="auth-container">
                    <Link to="/">
                        <img className="logo" src="/logo.png" alt="Brewify"/>
                    </Link>
                    <div className="content-box">
                        {this.props.children}
                    </div>
                </div>
                <Loading imgSrc="/loading.png"/>
            </div>
        );
    }
}