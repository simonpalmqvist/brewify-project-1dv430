/**
 * @description Recipe page, page for editing and creating recipes
 * @author simonpalmqvist
 */

import React from "react";
import Radium from "radium";
import ReactDOM from "react-dom";
import { createContainer } from "meteor/react-meteor-data";
import { connect }  from "react-redux";

import { updateRecipe } from "../actions/RecipeActions";
import { Recipes } from "../../api/recipes/Recipes";
import { RecipeFermentables } from "../../api/recipes/fermentables/RecipeFermentables";
import { Fermentables } from "../../api/brewerydb/Fermentables";
import { styles } from "../layouts/styles";

import { calcExpectedOg, calcFermentableWeight } from "../helpers/beerCalc";

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
        const { recipe, recipeFermentables, fermentables } = this.props;

        return (
            <div>
                <div style={styles.contentBox}>
                    <Input name="name"
                           value={recipe.name}
                           attr={{type: "text"}}
                           validate={this.recipeValidateOne}
                           style={styles.input}
                           onUpdate={update}/>
                    <Input label="Batch size (l)"
                           attr={{type: "number"}}
                           name="batchSize"
                           value={recipe.batchSize}
                           validate={this.recipeValidateOne}
                           style={styles.input}
                           onUpdate={update}/>
                    <Input name="boilTime"
                           label="Boil time (min)"
                           attr={{type: "number"}}
                           value={recipe.boilTime}
                           validate={this.recipeValidateOne}
                           style={styles.input}
                           onUpdate={update}/>
                </div>
                <div style={styles.contentBox}>
                    <FermentablesList
                        fermentables={fermentables}
                        recipeFermentables={recipeFermentables}
                        expectedOG={calcExpectedOg(recipeFermentables, recipe)}
                        fermentableWeight={calcFermentableWeight(recipeFermentables)}
                        recipeId={this.props.recipe._id}/>
                </div>
            </div>
        );
    }
}

Recipe.defaultProps = {
    recipe: {},
    recipeFermentables: []
};

//Applying radium to handle styles
const StyleRecipe = Radium(Recipe);

//Creates meteor container to provide subscribed data
const RecipeContainer = createContainer(({params}) => ({
    recipe: Recipes.findOne(params.id),
    recipeFermentables: RecipeFermentables.find({recipeId: params.id}).fetch(),
    fermentables: Fermentables.find().fetch()
}), StyleRecipe);

//Map the current state to the properties in component
function mappingStateToProps({ flashMessages }) {
    return {
        save: flashMessages.save,
        error: flashMessages.error
    };
}

export default connect(mappingStateToProps)(RecipeContainer);