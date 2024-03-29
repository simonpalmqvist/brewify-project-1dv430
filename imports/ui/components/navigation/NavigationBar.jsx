/**
 * @description Navigation header component
 * @author simonpalmqvist
 */

import React from "react";

import BackButton from "../base/BackButton";
import { Link } from "react-router";
import classNames from "classNames";

//Actions
import { logoutUser } from "../../actions/AuthActions";


export default class NavigationBar extends React.Component {
    constructor() {
        super();

        this.state = ({listOpen: false});
    }

    logout() {
        this.minimizeMenu();
        logoutUser();
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
        let nav = (<Link to="/login">Login</Link>);
        let list;
        let menuIconClasses = "menu-icon";

        if(listOpen) {
            menuIconClasses = classNames(menuIconClasses, "active");
            list = (
                <ul className="expanded-list">
                    <li><Link to="/brew/profile" onClick={this.minimizeMenu.bind(this)}>Brew profile</Link></li>
                    <li><a className="logout-option" href="#" onClick={this.logout.bind(this)}>Logout</a></li>
                </ul>
            );
        }

        if (Meteor.userId()) {
            nav = (
                <a href="#" className={menuIconClasses} onClick={this.toggleMenu.bind(this)}>

                </a>);
        }

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