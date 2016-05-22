/**
 * @description Actions for recipes
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import { browserHistory } from "react-router";
import Store from "../store";
import { saveAction, savingAction, errorAction, startedLoading, finishedLoading } from "./StatusActions";
import { addBrewProfile } from "./BrewProfileActions";

import { Recipes } from "../../api/recipes/Recipes";
import { BrewProfiles } from "../../api/brewprofiles/BrewProfiles";

import { srmToEbc, maybeGetAverage, enumerationToValue } from "../helpers/beerCalc";
import { BATCHSIZE, BOILTIME, HOPS, YEAST } from "../helpers/recipeStandards";

/**
 * Action to add a new recipe
 */
export function addRecipe() {
    let name = "Recipe";
    let brewProfile = BrewProfiles.findOne();

    if (!brewProfile) {
        return addBrewProfile();
    }

    let newRecipe = {
        name,
        batchSize: brewProfile.batchSize,
        boilTime: brewProfile.boilTime,
        efficiency: brewProfile.efficiency,
        boilLoss: brewProfile.boilLoss,
        fermenterLoss: brewProfile.fermenterLoss
    };

    Store.dispatch(() => {
        Meteor.callPromise("recipes.insert", newRecipe)
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
    savingAction();

    Store.dispatch(() => {
        Meteor.callPromise("recipes.update", id, update)
            .then(saveAction)
            .catch(errorAction);
    });
}

/**
 * Action to delete a recipe
 * @param id - id of which recipe to delete
 */
export function deleteRecipe(id) {
    savingAction();

    Store.dispatch(() => {
        Meteor.callPromise("recipes.remove", id)
            .then(saveAction)
            .catch(errorAction);
    });
}

/**
 * Action to update a recipes style
 * @param id
 * @param styleId
 */
export function updateRecipeStyle(id, styleId) {
    if (!styleId) {
        return errorAction({reason: "Could not find style, please choose one in the list."});
    }
    savingAction();

    Store.dispatch(() => {
        Meteor.callPromise("recipes.style.update", id, styleId)
            .then(saveAction)
            .catch(errorAction);
    });
}

/**
 * Helper function to validate if a collection value is correct
 * @param Collection - collection that key belongs to
 * @param key - key to check
 * @param value - value that should match key specifications
 * @returns {boolean} - if match is correct
 */
export function validateValue(Collection, key, value) {
    let obj = {};
    obj[key] = value;
    return Collection.schema.newContext().validateOne(obj, key);
}

/**
 * Helper function to set default fermentable value according to priority
 * 1. Get values from earlier used fermentable
 * 2. Get values from brewerydb database
 * 3. Set default values
 * @param fermentable
 * @returns {Object}
 */
export function getFermentableDefaults(fermentable) {
    return {
        name: fermentable.name,
        potential: fermentable.potential || 1,
        ebc: fermentable.ebc || srmToEbc(fermentable.srmPrecise || 0)
    };
}

/**
 * Action to add a new recipe fermentable
 * @param recipeId
 * @param fermentable
 */
export function addRecipeFermentable(recipeId, fermentable) {
    savingAction();

    const { name, potential, ebc } = getFermentableDefaults(fermentable);

    Store.dispatch(() => {
        Meteor.callPromise("recipes.fermentables.insert", recipeId, name, potential, ebc)
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
    savingAction();

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
    savingAction();

    Store.dispatch(() => {
        Meteor.callPromise("recipes.fermentables.remove", id)
            .then(saveAction)
            .catch(errorAction);
    });
}

/**
 * Helper function to set default hop value according to priority
 * 1. Get values from earlier used hop
 * 2. Get values from brewerydb database
 * 3. Set default values
 * @param hop
 * @returns {Object}
 */
export function getHopDefaults(hop) {
    return {
        name: hop.name,
        alpha: hop.alpha || maybeGetAverage(hop.alphaAcidMin, hop.alphaAcidMax),
        form: hop.form || HOPS.FORM.PELLET
    };
}

/**
 * Action to add a new recipe hop
 * @param recipeId
 * @param use - enum HOPS.USE
 * @param hop
 */
export function addRecipeHop(recipeId, use, hop) {
    savingAction();

    const { name, alpha, form} = getHopDefaults(hop);

    Store.dispatch(() => {
        Meteor.callPromise("recipes.hops.insert", recipeId, use, name, alpha, form)
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
    savingAction();

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
    savingAction();

    Store.dispatch(() => {
        Meteor.callPromise("recipes.hops.remove", id)
            .then(saveAction)
            .catch(errorAction);
    });
}

/**
 * Helper function to set default yeast value according to priority
 * 1. Get values from earlier used yeast
 * 2. Get values from brewerydb database
 * 3. Set default values
 * @param yeast
 * @returns {Object}
 */
export function getYeastDefaults(yeast) {
    return {
        name: yeast.name,
        form: yeast.form || enumerationToValue(YEAST.FORM, yeast.yeastFormat) || YEAST.FORM.DRY,
        type: yeast.type || enumerationToValue(YEAST.TYPE, yeast.yeastType)   || YEAST.TYPE.ALE,
        attenuation: yeast.attenuation || maybeGetAverage(yeast.attenuationMin, yeast.attenuationMax),
        minTemperature: yeast.fermentTempMin || 18,
        maxTemperature: yeast.fermentTempMax || 23,
        minAlcoholTolerance: yeast.alcoholToleranceMin || 0,
        maxAlcoholTolerance: yeast.alcoholToleranceMax || 20
    };
}

/**
 * Action to add a new recipe yeast
 * @param recipeId
 * @param yeast
 */
export function addRecipeYeast(recipeId, yeast) {
    savingAction();

    const newYeast = getYeastDefaults(yeast);

    Store.dispatch(() => {
        Meteor.callPromise("recipes.yeasts.insert", recipeId, newYeast)
            .then(saveAction)
            .catch(errorAction);
    });
}

/**
 * Action to update a recipe yeast
 * @param id - RecipeYeast id
 * @param update object with key value pairs on what should update
 */
export function updateRecipeYeast(id, update) {
    savingAction();

    Store.dispatch(() => {
        Meteor.callPromise("recipes.yeasts.update", id, update)
            .then(saveAction)
            .catch(errorAction);
    });
}

/**
 * Action to delete a recipe hop
 * @param id - RecipeHop id
 */
export function deleteRecipeYeast(id) {
    savingAction();

    Store.dispatch(() => {
        Meteor.callPromise("recipes.yeasts.remove", id)
            .then(saveAction)
            .catch(errorAction);
    });
}

/**
 * Action to add a new recipe ingredient
 * @param recipeId
 * @param ingredient
 */
export function addRecipeIngredient(recipeId, ingredient) {
    savingAction();

    Store.dispatch(() => {
        Meteor.callPromise("recipes.ingredients.insert", recipeId, ingredient.name)
            .then(saveAction)
            .catch(errorAction);
    });
}

/**
 * Action to update a recipe ingredient
 * @param id - RecipeIngredient id
 * @param update object with key value pairs on what should update
 */
export function updateRecipeIngredient(id, update) {
    savingAction();

    Store.dispatch(() => {
        Meteor.callPromise("recipes.ingredients.update", id, update)
            .then(saveAction)
            .catch(errorAction);
    });
}

/**
 * Action to delete a recipe ingredient
 * @param id - RecipeIngredient id
 */
export function deleteRecipeIngredient(id) {
    savingAction();

    Store.dispatch(() => {
        Meteor.callPromise("recipes.ingredients.remove", id)
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

    startedLoading();

    Store.getState().subscriptions.recipes.readyPromise()
        .then(() => {
            if(!Recipes.findOne(nextState.params.id)) {
                transition("/dashboard");
            }
            finishedLoading();
            callback();
        })
        .catch(() => {
            transition("/dashboard");
            finishedLoading();
        });
}