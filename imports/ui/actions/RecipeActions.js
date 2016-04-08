/**
 * @description Actions for recipes
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import Store from "../store";

/**
 * Action to add a new recipe
 */
export function addRecipe() {
    let name = "Recipe";
    let batchSize = 20;
    let boilTime = 60;

    Store.dispatch(() => {
        Meteor.callPromise("recipes.insert", name, batchSize, boilTime)
            .then((recipeId) => console.log(recipeId))
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