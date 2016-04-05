import React from "react";
import { Link } from "react-router";

export default class NavigationBar extends React.Component {
    render() {
        return (
            <nav id="main-navigation">
                <ul>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                </ul>
            </nav>
        );
    }
}