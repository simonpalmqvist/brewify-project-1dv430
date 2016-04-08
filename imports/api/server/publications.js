/**
 * @description Module to publish applications data sources
 * @author simonpalmqvist
 */

//Modules
import { Meteor } from "meteor/meteor";

//Collections
import { Recipes } from "../recipes/Recipes";

//Define what should be published to the client
Meteor.publish("recipes", function() {
    if (!this.userId) {
        return null;
    }
    return Recipes.find({userId: this.userId });
});