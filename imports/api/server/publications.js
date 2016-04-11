/**
 * @description Module to publish application data sources (what the client should be able to see)
 * @author simonpalmqvist
 */

//Modules
import { Meteor } from "meteor/meteor";

//Collections
import { Recipes } from "../recipes/Recipes";
import { Hops } from "../brewerydb/Hops";
import { Fermentables } from "../brewerydb/Fermentables";
import { Yeasts } from "../brewerydb/Yeasts";
import { Ingredients } from "../brewerydb/Ingredients";
import { Styles } from "../brewerydb/Styles";

//Define what should be published to the client

//All recipes that belong to user
Meteor.publish("recipes", function() {
    if (!this.userId) {
        return null;
    }
    return Recipes.find({userId: this.userId });
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