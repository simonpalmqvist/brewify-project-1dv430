/**
 * @description Dashboard page, main page for authenticated users
 * @author simonpalmqvist
 */

import React from "react";
import ReactDOM from "react-dom";
import { createContainer } from "meteor/react-meteor-data";
import { connect }  from "react-redux";

import { Recipes } from "../../api/recipes/Recipes";
import { addRecipe } from "../actions/RecipeActions";

import { Link } from "react-router";

class Dashboard extends React.Component {

    handle() {
        addRecipe();
    }

    render() {
        const { recipes} = this.props;

        //Create recipes list
        const listEl = recipes.map((recipe) => {
            return (<li key={recipe._id}><Link to={`/recipe/${recipe._id}`}>{recipe.name}</Link></li>);
        });

        return (
            <div>
                <div className="col-height-wrapper">
                    <div className="content-box full-width-mobile col-3-3">
                        <h1>News</h1>
                    </div>
                    <div className="content-box full-width-mobile col-1-3">
                        <button className="main-button" type="text" onClick={this.handle.bind(this)}>
                            Create recipe
                        </button>
                        <ul className="list-items">{listEl}</ul>
                    </div>
                </div>
            </div>
        );
    }
}

//Creates meteor container to provide subscribed data
const DashboardContainer = createContainer(() => ({
    recipes: Recipes.find({}).fetch()
}), Dashboard);

//Map the current state to the properties in component
function mappingStateToProps(state) {
    return {
        error: state.error
    };
}

export default connect(mappingStateToProps)(DashboardContainer);