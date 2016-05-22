/**
 * @description Styles collection to store beer styles data from breweryDB
 * @author simonpalmqvist
 */

import { Meteor } from  "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { Ground } from "meteor/ground:db";

export const Styles = new Mongo.Collection("styles");

//Create ground collection to be able to store and access data offline for client
if (Meteor.isClient) {
    Ground.Collection(Styles);
}