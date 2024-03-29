
//Import server dependencies
import "../imports/api/server/publications";
import "../imports/api/recipes/methods";
import "../imports/api/recipes/fermentables/methods";
import "../imports/api/recipes/hops/methods";
import "../imports/api/recipes/yeasts/methods";
import "../imports/api/recipes/ingredients/methods";
import "../imports/api/brewprofiles/methods";

import { SyncedCron } from "meteor/percolate:synced-cron";
import { syncBreweryDB } from  "../imports/api/server/breweryDB";
import { Accounts } from "meteor/accounts-base";



//Meteors testing flag is currently broken, so using an environment variable to load test utils for acceptance tests
Meteor.isTest = process.env.TEST === "true";
if (Meteor.isTest) {
    require("../imports/api/testUtils");
}

//Start up configs
Meteor.startup(() => {

    //Login expires after 90 days
    Accounts.config({
        loginExpirationInDays: 90
    });

    //Add cron job to sync data from breweryDB every night
    SyncedCron.add({
        name: "Syncing data from breweryDB",
        schedule: (parser) => parser.text("at 01:00 am"),
        job: syncBreweryDB
    });

    //Start with syncing breweryDB and starting up cron jobs
    SyncedCron.start();
    syncBreweryDB();

});