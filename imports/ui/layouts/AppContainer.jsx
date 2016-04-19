/**
 * @description Main layout component for application
 * @author simonpalmqvist
 */

import React from "react";
import { Link } from "react-router";

import { windowResize } from "../actions/browserActions";
import { styles } from "./styles";
import NavigationBar from "../components/navigation/NavigationBar";

export default class AppContainer extends React.Component {

    handleWindowChange() {
        console.log(window.innerWidth);
        windowResize(window.innerWidth);
    }

    componentWillMount() {
        this.handleWindowChange();
        window.addEventListener("resize", this.handleWindowChange);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowChange);
    }

    render() {
        return (
            <div>
                <header style={styles.header}>
                    <div style={styles.wrapper}>
                        <Link to="/"><img style={styles.logo} src="/logo.png" alt="Brewify"/></Link>
                        <NavigationBar/>
                    </div>
                </header>
                <div style={styles.wrapper}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}