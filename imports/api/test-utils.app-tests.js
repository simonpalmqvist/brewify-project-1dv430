import { Meteor } from "meteor/meteor";
import { resetDatabase } from "meteor/xolvio:cleaner";
import { createItems } from "./test-utils";

Meteor.startup(() => {
    if (Meteor.isServer) {
        Meteor.methods({
            "test.resetdb": () => resetDatabase(),

            "test.generate-items": (numberOfItems) => {
                return createItems(numberOfItems);
            }
        });
    }
});

