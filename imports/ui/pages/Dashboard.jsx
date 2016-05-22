/**
 * @description Dashboard page, main page for authenticated users
 * @author simonpalmqvist
 */

import React from "react";
import ReactDOM from "react-dom";
import { createContainer } from "meteor/react-meteor-data";
import { connect }  from "react-redux";

import { Recipes } from "../../api/recipes/Recipes";
import { addRecipe, deleteRecipe } from "../actions/RecipeActions";

import ConfirmButton from "../components/base/ConfirmButton";
import { Link } from "react-router";

class Dashboard extends React.Component {

    handle() {
        addRecipe();
    }

    render() {
        const { recipes} = this.props;

        //Create recipes list
        const listEl = recipes.map((recipe) => {
            const deleteFun = () => deleteRecipe(recipe._id);
            return (
                <li key={recipe._id}>
                    <Link to={`/recipe/${recipe._id}`}>
                        {recipe.name}
                    </Link>
                    <ConfirmButton text="Delete" symbol="×" className="delete" action={deleteFun}/>
                </li>
            );
        });

        return (
            <div>
                <div className="col-wrapper">
                    <div className="col col-1-3 right">
                        <div className="content-box">
                            <button className="main-button" type="text" onClick={this.handle.bind(this)}>
                                Create recipe
                            </button>
                            <ul className="recipe-list">{listEl}</ul>
                        </div>
                    </div>
                    <div className="col col-2-3">
                        <div className="content-box">
                            <h1>News</h1>
                            <h2>Newly added features</h2>
                            <p>
                                Last week some new features has been added to improve the user experience like giving
                                you error messages if an ingredient is missing a crucial value like potential or amount.
                            </p>
                            <p>
                                More features is being continuously developed and if you have any further feedback
                                or features you want to see then don't hesitate to contact us.
                            </p>
                        </div>
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