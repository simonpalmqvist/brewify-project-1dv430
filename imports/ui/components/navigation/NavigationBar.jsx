/**
 * @description Navigation header component
 * @author simonpalmqvist
 */

import React from "react";

import NavigationItem from "./NavigationItem";
import BackButton from "../base/BackButton";

export default class NavigationBar extends React.Component {
    render() {

        let links = [
            {url: "/register", title: "Register"},
            {url: "/login", title: "Login"}
        ];

        links = Meteor.userId() ? [{url: "/logout", title: "Logout"}] : links;

        links = links.map((props, i) => (<NavigationItem key={i} {...props}/>));

        return (
            <header className="c-navigation-bar">
                <div className="wrapper">
                    <BackButton/>
                    <img className="logo" src="/logo.png" alt="Brewify"/>
                    <nav>
                        <ul>
                            {links}
                        </ul>
                    </nav>
                </div>
            </header>

        );
    }
}