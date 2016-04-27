/**
 * @description Methods for calling the recipeYeast API
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import { Recipes } from "../Recipes";
import { RecipeYeasts } from "./RecipeYeasts";
import {getUser, belongsToUser} from "../../collectionHelpers";

Meteor.methods({
    "recipes.yeasts.insert": (recipeId, yeast) => {
        let userId = getUser(RecipeYeasts);
        let amount = 0;

        belongsToUser(Recipes, recipeId);

        if (RecipeYeasts.findOne({recipeId})) {
            throw new Meteor.Error("Recipe can only have one yeast");
        }

        //Add userId, recipeId and amount
        const newYeast = Object.assign({}, yeast, {userId, recipeId, amount});

        //Validate and store it
        return RecipeYeasts.insert(newYeast);
    },

    "recipes.yeasts.update": (id, dataToUpdate) => {

        belongsToUser(RecipeYeasts, id);

        RecipeYeasts.update(id, {$set: dataToUpdate});
    },

    "recipes.yeasts.remove": (id) => {
        belongsToUser(RecipeYeasts, id);

        RecipeYeasts.remove(id);
    }
});