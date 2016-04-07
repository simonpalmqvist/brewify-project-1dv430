/**
 * @description Navigation item component
 * @author simonpalmqvist
 */

import React from "react";
import { Link } from "react-router";

export default class NavigationItem extends React.Component {
    render() {
        const { url, title } = this.props;

        return (
             <li><Link to={url}>{title}</Link></li>
        );
    }
}