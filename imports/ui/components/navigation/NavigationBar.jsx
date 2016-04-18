/**
 * @description Navigation header component
 * @author simonpalmqvist
 */

import React from "react";

import NavigationItem from "./NavigationItem";

export default class NavigationBar extends React.Component {
    render() {

        let links = [
            {url: "/register", title: "Register"},
            {url: "/login", title: "Login"}
        ];

        links = Meteor.userId() ? [{url: "/logout", title: "Logout"}] : links;

        links = links.map((props, i) => (<NavigationItem key={i} {...props}/>));

        return (
            <nav style={{float: "right"}}>
                <ul>
                    {links}
                </ul>
            </nav>
        );
    }
}