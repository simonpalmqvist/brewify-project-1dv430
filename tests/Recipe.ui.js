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

describe("Recipe UI", function() {
    beforeEach(function() {
        server.call("test.resetdb");
        user = server.call("test.create-user");

        userId = login(user);

        recipe = server.call("test.generate-recipes", 1, userId)[0];
        fermentables = server.call("test.generate-fermentables", 30);

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
        //browser.pause(10000);

        server.call("test.get-recipes")[0].name.should.equal(newName);
    });

    it("Should be able to add fermentable", function() {
        const searchString = fermentables[5].name.split(" ")[0];

        browser.waitForExist("button.add-fermentable");

        browser.click("button.add-fermentable");


        browser.setValue("input.add-fermentable", searchString);

        browser.keys(["Enter"]);

        const elements = browser.elements(".recipe-fermentables tbody tr");

        //Should have one new fermentable
        elements.value.length.should.equal(1);
    });
});