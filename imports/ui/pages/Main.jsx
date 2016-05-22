/**
 * @description Main page for unauthenticated users
 * @author simonpalmqvist
 */

import React from "react";

import { Link } from "react-router";

export default class Main extends React.Component {
    render() {
        return (
            <div className="marketing-info content-box">
                <h1>Your favourite brewing tool</h1>
                <Link className="secondary-button center" to="/register">Register here</Link>

                <div className="marketing-content beer-symbol">
                    <h3>Beer recipe creation made simple</h3>
                    <p>
                        With this tool you can easily create recipes and get all calculations for expected
                        OG, FG, IBU and ABV automatically calculated as you pick and choose different
                        ingredients.
                    </p>
                </div>

                <div className="marketing-content ingredient-symbol right">
                    <h3>A large selection of ingredients</h3>
                    <p>
                        You can easily search for standard grains, hops, yeasts and other ingredients and simply
                        add them to you recipe. Is an ingredient missing? Just add it and your account will
                        remember it along with changes to an hops alpha-acid or a grains color or potential.
                    </p>
                </div>

                <div className="marketing-content sync-symbol">
                    <h3>Always in sync</h3>
                    <p>
                        Your changes to a recipe will be saved and synced directly and available on
                        any of your other devices instantly.
                    </p>
                </div>

            </div>
        );
    }
}