/**
 * @description Test collection with schema
 * @author simonpalmqvist
 */

import { Mongo } from "meteor/mongo";
import simpleSchema from "meteor/aldeed:simple-schema";

export const Items = new Mongo.Collection("items");

Items.schema = new SimpleSchema({
    text: {type: String}
});