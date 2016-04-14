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
import { RecipeFermentables } from "../../api/recipes/fermentables/RecipeFermentables";
import { Fermentables } from "../../api/brewerydb/Fermentables";

import Input from "../components/recipe/Input";
import FermentablesList from "../components/recipe/FermentablesList";

class Recipe extends React.Component {

    update(value) {
        updateRecipe(this.props.recipe._id, value);
    }

    recipeValidateOne(key, value) {
        let obj = {};
        obj[key] = value;
        return Recipes.schema.newContext().validateOne(obj, key);
    }

    render() {
        const update = this.update.bind(this);
        const { recipe, recipeFermentables } = this.props;

        return (
            <div>
                <Input name="name"
                       value={recipe.name}
                       attr={{type: "text"}}
                       validate={this.recipeValidateOne}
                       onUpdate={update}/>
                <Input label="Batch size (l)"
                       attr={{type: "number"}}
                       name="batchSize"
                       value={recipe.batchSize}
                       validate={this.recipeValidateOne}
                       onUpdate={update}/>
                <Input name="boilTime"
                       label="Boil time (min)"
                       attr={{type: "number"}}
                       value={recipe.boilTime}
                       validate={this.recipeValidateOne}
                       onUpdate={update}/>
                <FermentablesList
                    fermentables={recipeFermentables}
                    expectedOG={1.030}
                    totalFermentables={recipeFermentables.reduce((sum, {amount}) => sum + amount, 0)}
                    recipeId={this.props.recipe._id}/>
            </div>
        );
    }
}

Recipe.defaultProps = {
    recipe: {},
    recipeFermentables: []
};

//Creates meteor container to provide subscribed data
const RecipeContainer = createContainer(({params}) => ({
    recipe: Recipes.findOne(params.id),
    recipeFermentables: RecipeFermentables.find({recipeId: params.id}).fetch()
}), Recipe);

//Map the current state to the properties in component
function mappingStateToProps({ flashMessages }) {
    return {
        save: flashMessages.save,
        error: flashMessages.error
    };
}

export default connect(mappingStateToProps)(RecipeContainer);