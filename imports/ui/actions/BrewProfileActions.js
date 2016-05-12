/**
 * @description Actions for brew profile
 * @author simonpalmqvist
 */

import { Meteor } from "meteor/meteor";
import { browserHistory } from "react-router";
import Store from "../store";
import { saveAction, errorAction } from "./StatusActions";
import { BrewProfiles } from "../../api/brewprofiles/BrewProfiles";

import {
    EFFICIENCY,
    BATCHSIZE,
    BOILTIME,
    EVAP_RATE,
    WATER_GRAIN_RATIO,
    BOIL_LOSS,
    FERMENTER_LOSS,
    LAUTER_DEAD_SPACE,
    GRAIN_TEMP
} from "../helpers/recipeStandards";

/**
 * Action to add a brew profile
 */
export function addBrewProfile() {
    let brewProfile = {
        efficiency: EFFICIENCY,
        batchSize: BATCHSIZE,
        boilTime: BOILTIME,
        evapRate: EVAP_RATE,
        waterGrainRatio: WATER_GRAIN_RATIO,
        boilLoss: BOIL_LOSS,
        fermenterLoss: FERMENTER_LOSS,
        lauterDeadSpace: LAUTER_DEAD_SPACE,
        grainTemp : GRAIN_TEMP
    };

    Store.dispatch(() => {
        Meteor.callPromise("brew.profiles.insert", brewProfile)
            .then(() => {
                browserHistory.push("/brew/profile");
                finishedLoading();
            })
            .catch(() => {
                errorAction();
                finishedLoading();
            });
    });
}

/**
 * Action to update brew profile
 * @param id
 * @param update
 */
export function updateBrewProfile(id, update) {
    Store.dispatch(() => {
        Meteor.callPromise("brew.profiles.update", id, update)
            .then(saveAction)
            .catch(errorAction);
    });
}