import { Meteor } from "meteor/meteor";
import { Items } from "./Items";

Meteor.methods({
    "items.insert": (text) => {
        //Validate that text is correctly formatted
        Items.schema.validate({text});
        //Store it
        Items.insert({text});
    }
});