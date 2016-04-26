/**
 * @description Methods for calling the recipeHops API
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import { Recipes } from "../Recipes";
import { RecipeHops } from "./RecipeHops";
import {getUser, belongsToUser} from "../../collectionHelpers";

Meteor.methods({
    "recipes.hops.insert": (recipeId, use, name, alpha, form) => {
        let userId = getUser(RecipeHops);
        let amount = 0;
        let time = 0;

        belongsToUser(Recipes, recipeId);

        const newHop = {userId, recipeId, name, form, use, alpha, amount, time};

        //Validate and store it
        return RecipeHops.insert(newHop);
    },

    "recipes.hops.update": (id, dataToUpdate) => {

        belongsToUser(RecipeHops, id);

        RecipeHops.update(id, {$set: dataToUpdate});
    },

    "recipes.hops.remove": (id) => {
        belongsToUser(RecipeHops, id);

        RecipeHops.remove(id);
    }
});