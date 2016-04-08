import "../imports/api/server/publications";
import "../imports/api/recipes/methods";
import { Accounts } from "meteor/accounts-base";

Accounts.config({
    loginExpirationInDays: null
});
