/**
 * @description Fermentables collection to store fermentables data from breweryDB
 * @author simonpalmqvist
 */

import { Meteor } from  "meteor/meteor";
import { Mongo } from "meteor/mongo";

export const Fermentables = new Mongo.Collection("fermentables");