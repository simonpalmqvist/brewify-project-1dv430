/* eslint-env mocha */
// These are Chimp globals
/* globals browser should server */

/**
 * @description Acceptance tests for recipe editing
 * @author simonpalmqvist
 */

import { login, logout} from "./lib";
import faker from "faker";

let user;
let userId;
let recipe;
let fermentables;
let hops;

describe("Recipe UI", function() {
    beforeEach(function() {
        server.call("test.resetdb");
        user = server.call("test.create-user");

        userId = login(user);

        recipe = server.call("test.generate-recipes", 1, userId)[0];
        fermentables = server.call("test.generate-fermentables", 30);
        hops = server.call("test.generate-hops", 30);

        //Go to url
        browser.url(`http://localhost:3000/recipe/${recipe._id}`);

    });

    afterEach(function() {
        logout();
    });

    it("Should be able to change name", function() {
        const newName = faker.lorem.words();

        browser.waitForExist("input[name=name]");

        browser.setValue("input[name=name]", newName);

        //Press enter
        browser.keys(["Enter"]);

        server.call("test.get-recipes")[0].name.should.equal(newName);
    });

    it("Should be able to add fermentable", function() {
        const searchString = fermentables[5].name.split(" ")[0];

        browser.waitForExist("button.add-fermentable");

        browser.click("button.add-fermentable");

        browser.setValue("input.add-fermentable", searchString);

        browser.keys(["Enter"]);

        browser.waitForExist(".recipe-fermentables tbody tr");

        const elements = browser.elements(".recipe-fermentables tbody tr");

        //Should have one new fermentable
        elements.value.length.should.equal(1);
    });

    //TODO: TEST Change fermentable value, See so same fermentable has new value
    //TODO: TEST Create own fermentable

    it("Should be able to add hop", function() {
        const searchString = hops[5].name.split(" ")[0];

        browser.waitForExist("button.add-hop");

        browser.click("button.add-hop");

        browser.setValue("input.add-hop", searchString);

        browser.keys(["Enter"]);

        browser.waitForExist(".recipe-hops tbody tr");

        const elements = browser.elements(".recipe-hops tbody tr");

        //Should have one new hop
        elements.value.length.should.equal(1);
    });
});