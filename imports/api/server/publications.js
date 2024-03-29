/**
 * @description Module to publish application data sources (what the client should be able to see)
 * @author simonpalmqvist
 */

//Modules
import { Meteor } from "meteor/meteor";

//Collections
import { BrewProfiles } from "../brewprofiles/BrewProfiles";
import { Recipes } from "../recipes/Recipes";
import { RecipeFermentables } from "../recipes/fermentables/RecipeFermentables";
import { RecipeHops } from "../recipes/hops/RecipeHops";
import { RecipeYeasts } from "../recipes/yeasts/RecipeYeasts";
import { RecipeIngredients } from "../recipes/ingredients/RecipeIngredients";
import { Fermentables } from "../brewerydb/Fermentables";
import { Hops } from "../brewerydb/Hops";
import { Yeasts } from "../brewerydb/Yeasts";
import { Ingredients } from "../brewerydb/Ingredients";
import { Styles } from "../brewerydb/Styles";

//Define what should be published to the client

//All brew profiles that belong to user
Meteor.publish("brew.profiles", function() {
    if (!this.userId) {
        return null;
    }
    return BrewProfiles.find({userId: this.userId });
});

//All recipes that belong to user
Meteor.publish("recipes", function() {
    if (!this.userId) {
        return null;
    }
    return Recipes.find({userId: this.userId });
});

//All recipe fermentables that belong to user
Meteor.publish("recipes.fermentables", function() {
    if (!this.userId) {
        return null;
    }
    return RecipeFermentables.find({userId: this.userId });
});

//All recipe hops that belong to user
Meteor.publish("recipes.hops", function() {
    if (!this.userId) {
        return null;
    }
    return RecipeHops.find({userId: this.userId });
});

//All recipe yeasts that belong to user
Meteor.publish("recipes.yeasts", function() {
    if (!this.userId) {
        return null;
    }
    return RecipeYeasts.find({userId: this.userId });
});

//All other recipe ingredients that belong to user
Meteor.publish("recipes.ingredients", function() {
    if (!this.userId) {
        return null;
    }

    return RecipeIngredients.find({ userId: this.userId });
});

//All hops for logged in users
Meteor.publish("hops", function() {
    if (!this.userId) {
        return null;
    }
    return Hops.find({});
});

//All Fermentables for logged in users
Meteor.publish("fermentables", function() {
    if (!this.userId) {
        return null;
    }
    return Fermentables.find({});
});

//All Yeasts for logged in users
Meteor.publish("yeasts", function() {
    if (!this.userId) {
        return null;
    }
    return Yeasts.find({});
});

//All Other ingredients for logged in users
Meteor.publish("ingredients", function() {
    if (!this.userId) {
        return null;
    }
    //Ingredients also contain hops, fermentables and yeasts so only return misc
    return Ingredients.find({category: "misc"});
});

//All beer styles for logged in users
Meteor.publish("styles", function() {
    if (!this.userId) {
        return null;
    }

    return Styles.find({});
});