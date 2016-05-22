/**
 * @description Methods for calling the recipes API
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import { Recipes } from "./Recipes";
import { Styles } from "../brewerydb/Styles";
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
    },

    "recipes.style.update": (id, styleId) => {
        belongsToUser(Recipes, id);

        if (!Styles.findOne({_id: styleId})) {
            throw new Meteor.Error("Beer style doesn't exist");
        }

        Recipes.update(id, {$set: {styleId: styleId}});
    },

    "recipes.style.remove": (id) => {
        belongsToUser(Recipes, id);

        Recipes.update(id, {$set: {styleId: undefined}});
    }
});

if (Meteor.isClient) {
    Ground.methodResume([
        "recipes.insert",
        "recipes.update",
        "recipes.remove",
        "recipes.style.update",
        "recipes.style.remove"
    ]);
}