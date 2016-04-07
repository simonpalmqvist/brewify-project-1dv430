/**
 * @description Methods for calling the recipes API
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import { Recipes } from "./Recipes";

Meteor.methods({
    "recipes.insert": (name, batchSize, boilTime) => {
        const newRecipe = {name, batchSize, boilTime};

        //Validate and store it
        Recipes.schema.validate(newRecipe);
        Recipes.insert(newRecipe);
    },

    "recipes.update": (id, dataToUpdate) => {
        Recipes.update(id, {$set: dataToUpdate});
    },

    "recipes.remove": (id) => {
        Recipes.remove(id);
    }
});