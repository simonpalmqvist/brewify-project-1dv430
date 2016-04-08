/**
 * @description Methods for calling the recipes API
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import { Recipes } from "./Recipes";
import {getUser, belongsToUser} from "../collectionHelpers";

Meteor.methods({
    "recipes.insert": (name, batchSize, boilTime) => {
        let userId = getUser(Recipes);

        const newRecipe = {userId, name, batchSize, boilTime};

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