/**
 * @description Actions for recipes
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import { browserHistory } from "react-router";
import Store from "../store";
import { saveAction, errorAction } from "./statusActions";
import { Recipes } from "../../api/recipes/Recipes";

import { srmToEbc } from "../helpers/beerCalc";
import { BATCHSIZE, BOILTIME, YIELD, SRM} from "../helpers/recipeStandards";

/**
 * Action to add a new recipe
 */
export function addRecipe() {
    let name = "Recipe";
    let batchSize = BATCHSIZE;
    let boilTime = BOILTIME;

    Store.dispatch(() => {
        Meteor.callPromise("recipes.insert", name, batchSize, boilTime)
            .then((recipeId) => browserHistory.push(`/recipe/${recipeId}`))
            .catch(errorAction);
    });
}

/**
 * Action to update a recipe
 * @param id
 * @param update
 */
export function updateRecipe(id, update) {
    Store.dispatch(() => {
        Meteor.callPromise("recipes.update", id, update)
            .then(saveAction)
            .catch(errorAction);
    });
}

/**
 * Action to add a new recipe fermentable
 * @param recipeId
 * @param fermentable
 */
export function addRecipeFermentable(recipeId, fermentable) {
    let extractYield = fermentable.dryYield || YIELD;
    let ebc = srmToEbc(fermentable.srmPrecise || SRM);

    Store.dispatch(() => {
        Meteor.callPromise("recipes.fermentables.insert", recipeId, fermentable.name, extractYield, ebc)
            .then(saveAction)
            .catch(errorAction);
    });
}

/**
 * Action to update a recipe fermentable
 * @param id
 * @param update
 */
export function updateRecipeFermentable(id, update) {
    Store.dispatch(() => {
        Meteor.callPromise("recipes.fermentables.update", id, update)
            .then(saveAction)
            .catch(errorAction);
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