import { Meteor } from "meteor/meteor";
import { Items } from "./Items";

Meteor.methods({
    "items.insert": (text) => {
        Items.schema.validate({text});
        Items.insert({text});
    }
});