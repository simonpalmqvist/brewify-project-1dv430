/**
 * @description Actions for recipes
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import { browserHistory } from "react-router";
import Store from "../store";
import { saveAction, errorAction } from "./StatusActions";
import { addBrewProfile } from "./BrewProfileActions";

import { Recipes } from "../../api/recipes/Recipes";
import { BrewProfiles } from "../../api/brewprofiles/BrewProfiles";

import { srmToEbc } from "../helpers/beerCalc";
import { BATCHSIZE, BOILTIME, HOPS } from "../helpers/recipeStandards";

/**
 * Action to add a new recipe
 */
export function addRecipe() {
    let name = "Recipe";
    let brewProfile = BrewProfiles.findOne();

    if (!brewProfile) {
        return addBrewProfile();
    }

    Store.dispatch(() => {
        Meteor.callPromise("recipes.insert", name, brewProfile.batchSize, brewProfile.boilTime)
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
    let potential = fermentable.potential || 1;
    let ebc = srmToEbc(fermentable.srmPrecise || 0);

    Store.dispatch(() => {
        Meteor.callPromise("recipes.fermentables.insert", recipeId, fermentable.name, potential, ebc)
            .then(saveAction)
            .catch(errorAction);
    });
}

/**
 * Action to update a recipe fermentable
 * @param id - RecipeFermentable id
 * @param update object with key value pairs on what should update
 */
export function updateRecipeFermentable(id, update) {
    Store.dispatch(() => {
        Meteor.callPromise("recipes.fermentables.update", id, update)
            .then(saveAction)
            .catch(errorAction);
    });
}

/**
 * Action to delete a recipe fermentable
 * @param id - RecipeFermentable id
 */
export function deleteRecipeFermentable(id) {
    Store.dispatch(() => {
        Meteor.callPromise("recipes.fermentables.remove", id)
            .then(saveAction)
            .catch(errorAction);
    });
}

/**
 * Action to add a new recipe hop
 * @param recipeId
 * @param use - enum HOPS.USE
 * @param hop
 */
export function addRecipeHop(recipeId, use, hop) {
    const alpha = hop.alphaAcidMin || hop.alphaAcidMax || hop.alpha || 0;
    const form = HOPS.FORM.PELLET;

    Store.dispatch(() => {
        Meteor.callPromise("recipes.hops.insert", recipeId, use, hop.name, alpha, form)
            .then(saveAction)
            .catch(errorAction);
    });
}

/**
 * Action to update a recipe hop
 * @param id - RecipeHop id
 * @param update object with key value pairs on what should update
 */
export function updateRecipeHop(id, update) {
    Store.dispatch(() => {
        Meteor.callPromise("recipes.hops.update", id, update)
            .then(saveAction)
            .catch(errorAction);
    });
}

/**
 * Action to delete a recipe hop
 * @param id - RecipeHop id
 */
export function deleteRecipeHop(id) {
    Store.dispatch(() => {
        Meteor.callPromise("recipes.hops.remove", id)
            .then(saveAction)
            .catch(errorAction);
    });
}

/**
 * Authorization method to redirect user if recipe doesn't belong to user or doesn't exist
 * @param nextState
 * @param transition
 * @param callback
 */
export function recipeExists(nextState, transition, callback) {
    if (!Meteor.userId()) {
        transition("/login");
        callback();
    }

    Store.getState().subscriptions.recipes.readyPromise()
        .then(() => {
            if(!Recipes.findOne(nextState.params.id)) {
                transition("/dashboard");
            }
            callback();
        })
        .catch(() => transition("/dashboard"));
}