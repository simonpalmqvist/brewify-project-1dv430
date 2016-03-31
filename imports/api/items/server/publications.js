import { Meteor } from "meteor/meteor";
import { Items } from "../Items";

//Define what should be published to the client (in this case all items)
Meteor.publish("items", () => Items.find({}));