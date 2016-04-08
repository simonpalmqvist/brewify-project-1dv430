/**
 * @description Helper functions for collection, schemas and methods
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";

export function getUser() {
    if (!Meteor.userId()) { throw Meteor.Error(403, "Not authorized"); }
    return Meteor.userId();
}

export function belongsToUser(Collection, id) {
    const recipe = Collection.findOne(id);
    if (recipe.userId !== Meteor.userId()) { throw Meteor.Error(403, "Not authorized"); }
}
