import "../imports/api/server/publications";
import "../imports/api/items/methods";
import { Accounts } from "meteor/accounts-base";

Accounts.config({
    loginExpirationInDays: null
});
