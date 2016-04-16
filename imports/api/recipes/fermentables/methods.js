/**
 * @description Methods for calling the recipeFermentables API
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import { Recipes } from "../Recipes";
import { RecipeFermentables } from "./RecipeFermentables";
import {getUser, belongsToUser} from "../../collectionHelpers";

Meteor.methods({
    "recipes.fermentables.insert": (recipeId, name, potential, ebc) => {
        let userId = getUser(RecipeFermentables);
        let amount = 0;

        belongsToUser(Recipes, recipeId);

        const newFermentable = {userId, recipeId, name, amount, potential, ebc};

        //Validate and store it
        return RecipeFermentables.insert(newFermentable);
    },

    "recipes.fermentables.update": (id, dataToUpdate) => {

        belongsToUser(RecipeFermentables, id);

        RecipeFermentables.update(id, {$set: dataToUpdate});
    },

    "recipes.fermentables.remove": (id) => {
        belongsToUser(RecipeFermentables, id);

        RecipeFermentables.remove(id);
    }
});