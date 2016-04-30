/**
 * @description Methods for calling the recipeIngredients API
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import { Recipes } from "../Recipes";
import { RecipeIngredients } from "./RecipeIngredients";
import { INGREDIENT } from "../../../ui/helpers/recipeStandards";
import {getUser, belongsToUser} from "../../collectionHelpers";

Meteor.methods({
    "recipes.ingredients.insert": (recipeId, name) => {
        let userId = getUser(RecipeIngredients);

        belongsToUser(Recipes, recipeId);

        const newIngredient = {
            userId,
            recipeId,
            name,
            amount: 0,
            added: INGREDIENT.ADDED.BOIL,
            time: 0,
            timeType: INGREDIENT.TIMETYPE.MIN
        };

        //Validate and store it
        return RecipeIngredients.insert(newIngredient);
    },

    "recipes.ingredients.update": (id, dataToUpdate) => {

        belongsToUser(RecipeIngredients, id);

        RecipeIngredients.update(id, {$set: dataToUpdate});
    },

    "recipes.ingredients.remove": (id) => {
        belongsToUser(RecipeIngredients, id);

        RecipeIngredients.remove(id);
    }
});