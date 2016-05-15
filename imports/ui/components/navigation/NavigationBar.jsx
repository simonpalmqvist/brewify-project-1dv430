/**
 * @description Navigation header component
 * @author simonpalmqvist
 */

import React from "react";

import NavigationItem from "./NavigationItem";
import BackButton from "../base/BackButton";
import { Link } from "react-router";

export default class NavigationBar extends React.Component {
    constructor() {
        super();

        this.state = ({listOpen: false});
    }

    toggleMenu() {
        //Toggle menu
        this.setState({listOpen: !this.state.listOpen});
    }

    minimizeMenu() {
        this.setState({listOpen: false});
    }

    render() {
        const { listOpen } = this.state;

        //Show menu
        let nav = (<a href="#" onClick={this.toggleMenu.bind(this)}>Menu</a>);
        let list;

        if (!Meteor.userId()) {
            nav = (<Link to="/login">Login</Link>);
        } else if(listOpen) {
            list = (
                <ul className="expanded-list">
                    <li><Link to="/brew/profile">Brew profile</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                </ul>
            );
        }

        //links = Meteor.userId() ? [{url: "/logout", title: "Logout"}] : links;

        //links = links.map((props, i) => (<NavigationItem key={i} {...props}/>));

        return (
            <header className="c-navigation-bar">
                <div className="wrapper">
                    <BackButton/>
                    <img className="logo" src="/logo.png" alt="Brewify"/>
                    <nav>
                        { nav }
                        { list }
                    </nav>

                </div>

            </header>

        );
    }
}