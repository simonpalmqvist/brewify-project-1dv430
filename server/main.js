import "../imports/api/server/publications";
import "../imports/api/recipes/methods";
import { syncBreweryDB } from  "../imports/api/server/breweryDB";
import { Accounts } from "meteor/accounts-base";

Accounts.config({
    loginExpirationInDays: null
});


Meteor.startup(() => {
    syncBreweryDB();
});