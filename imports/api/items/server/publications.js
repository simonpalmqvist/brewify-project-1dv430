import { Meteor } from "meteor/meteor";
import { Items } from "../Items";

//Define what should be published to the client (in this case all items for authenticated users)
Meteor.publish("items", function() {
    if (!this.userId) {
        return null;
    }
    return Items.find({});
});