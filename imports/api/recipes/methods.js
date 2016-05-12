/**
 * @description Methods for calling the recipes API
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import { Recipes } from "./Recipes";
import {getUser, belongsToUser} from "../collectionHelpers";

Meteor.methods({
    "recipes.insert": (newRecipe) => {
        newRecipe.userId = getUser(Recipes);

        //Validate and store it
        return Recipes.insert(newRecipe);
    },

    "recipes.update": (id, dataToUpdate) => {

        belongsToUser(Recipes, id);

        Recipes.update(id, {$set: dataToUpdate});
    },

    "recipes.remove": (id) => {
        belongsToUser(Recipes, id);

        Recipes.remove(id);
    }
});