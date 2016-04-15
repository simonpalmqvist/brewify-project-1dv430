/**
 * @description Helper functions for collection, schemas and methods
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";

export function getUser() {
    const userId = Meteor.userId();

    if (!userId) { throw Meteor.Error(403, "Not authorized"); }
    return userId;
}

export function belongsToUser(Collection, id) {
    const userId = Meteor.userId();
    const recipe = Collection.findOne(id);
    if (!recipe || recipe.userId !== userId) { throw Meteor.Error(403, "Not authorized"); }
}
