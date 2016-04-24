/**
 * @description Methods for calling the brew profile API
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import { BrewProfiles } from "./BrewProfiles";
import {getUser, belongsToUser} from "../collectionHelpers";

Meteor.methods({
    "brew.profiles.insert": (newBrewProfile) => {
        newBrewProfile.userId = getUser(BrewProfiles);

        //Validate and store it
        return BrewProfiles.insert(newBrewProfile);
    },

    "brew.profiles.update": (id, dataToUpdate) => {

        belongsToUser(BrewProfiles, id);

        BrewProfiles.update(id, {$set: dataToUpdate});
    },

    "brew.profiles.remove": (id) => {
        belongsToUser(BrewProfiles, id);

        BrewProfiles.remove(id);
    }
});