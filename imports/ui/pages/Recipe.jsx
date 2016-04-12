/**
 * @description Recipe page, page for editing and creating recipes
 * @author simonpalmqvist
 */

import React from "react";
import ReactDOM from "react-dom";
import { createContainer } from "meteor/react-meteor-data";
import { connect }  from "react-redux";

import { updateRecipe } from "../actions/RecipeActions";
import { Recipes } from "../../api/recipes/Recipes";
import { Fermentables } from "../../api/brewerydb/Fermentables";

import Input from "../components/recipe/Input";
import FermentablesList from "../components/recipe/FermentablesList";

class Recipe extends React.Component {

    update(value) {
        updateRecipe(this.props.recipe._id, value);
    }

    addFermentable(error, result) {
        console.log(error, result);
    }

    render() {
        const update = this.update.bind(this);
        const recipe = this.props.recipe || {};

        return (
            <div>
                <Input type="text" name="name" value={recipe.name} updateFun={update}/>
                <Input title="Batch size (l)" type="number" name="batchSize" value={recipe.batchSize} updateFun={update}/>
                <Input title="Boil time (min)" type="number" name="boilTime" value={recipe.boilTime} updateFun={update}/>
                <FermentablesList
                    fermentables={[]}
                    expectedOG={1.030}
                    totalFermentables={3.000}
                    addFermentables={this.addFermentable.bind(this)}
                    updateFermentables={() => {}}/>
            </div>
        );
    }
}

//Creates meteor container to provide subscribed data
const RecipeContainer = createContainer(({params}) => ({recipe: Recipes.findOne(params.id)}), Recipe);

//Map the current state to the properties in component
function mappingStateToProps({ flashMessages }) {
    return {
        save: flashMessages.save,
        error: flashMessages.error
    };
}

export default connect(mappingStateToProps)(RecipeContainer);