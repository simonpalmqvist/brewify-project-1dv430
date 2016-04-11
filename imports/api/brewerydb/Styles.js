/**
 * @description Styles collection to store beer styles data from breweryDB
 * @author simonpalmqvist
 */

import { Meteor } from  "meteor/meteor";
import { Mongo } from "meteor/mongo";

export const Styles = new Mongo.Collection("styles");