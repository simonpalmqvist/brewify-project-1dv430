/**
 * @description Yests collection to store yeast data from breweryDB
 * @author simonpalmqvist
 */

import { Meteor } from  "meteor/meteor";
import { Mongo } from "meteor/mongo";

export const Yeasts = new Mongo.Collection("yeasts");