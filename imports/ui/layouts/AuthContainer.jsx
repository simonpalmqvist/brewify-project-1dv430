/**
 * @description Main layout component for application
 * @author simonpalmqvist
 */

import React from "react";
import Radium from "radium";
import { Link } from "react-router";

import { styles } from "./styles";

@Radium
class AuthContainer extends React.Component {

    render() {
        return (
            <div style={styles.authWrapper}>
                <div style={styles.center}>
                    <Link to="/">
                        <img style={[styles.logo,{paddingBottom: "40px"}]} src="/logo.png" alt="Brewify"/>
                    </Link>
                    <div style={styles.contentBox}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Radium(AuthContainer);