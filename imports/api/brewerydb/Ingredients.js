/**
 * @description Ingredients collection to store ingredient data from breweryDB
 * @author simonpalmqvist
 */

import { Meteor } from  "meteor/meteor";
import { Mongo } from "meteor/mongo";

export const Ingredients = new Mongo.Collection("ingredients");