/**
 * @description Hops collection to store hops data from breweryDB
 * @author simonpalmqvist
 */

import { Meteor } from  "meteor/meteor";
import { Mongo } from "meteor/mongo";

export const Hops = new Mongo.Collection("hops");