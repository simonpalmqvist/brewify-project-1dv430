import "../imports/api/server/publications";
import "../imports/api/items/methods";
import "../imports/api/recipes/methods";
import { Accounts } from "meteor/accounts-base";

Accounts.config({
    loginExpirationInDays: null
});
