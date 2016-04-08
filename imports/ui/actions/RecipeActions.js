/**
 * @description Actions for recipes
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import { browserHistory } from "react-router";
import Store from "../store";
import { Recipes } from "../../api/recipes/Recipes";

/**
 * Action to add a new recipe
 */
export function addRecipe() {
    let name = "Recipe";
    let batchSize = 20;
    let boilTime = 60;

    Store.dispatch(() => {
        Meteor.callPromise("recipes.insert", name, batchSize, boilTime)
            .then((recipeId) => browserHistory.push(`/recipe/${recipeId}`))
            .catch((error) => Store.dispatch({type: "ERROR", error}));
    });
}

/**
 * Action to update a recipe
 */
export function updateRecipe(id, update) {
    Store.dispatch(() => {
        Meteor.callPromise("recipes.update", id, update)
            .then(() => Store.dispatch({type: "SAVE"}))
            .catch((error) => Store.dispatch({type: "ERROR", error}));
    });
}



/**
 * Authorization method to redirect user if recipe doesn't belong to user or doesn't exist
 * @param nextState
 * @param transition
 */
export function recipeExists(nextState, transition) {
    if(!Recipes.findOne(nextState.params.id)) {
        transition("/dashboard");
    }
}