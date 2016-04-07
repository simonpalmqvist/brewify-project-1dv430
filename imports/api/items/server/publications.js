/**
 * @description Module to publish applications data sources
 * @author simonpalmqvist
 */

//Modules
import { Meteor } from "meteor/meteor";

//Collections
import { Items } from "../Items";

//Define what should be published to the client (in this case all items for authenticated users)
Meteor.publish("items", function() {
    if (!this.userId) {
        return null;
    }
    return Items.find({});
});