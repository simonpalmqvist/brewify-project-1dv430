/* eslint-env mocha */
// These are Chimp globals
/* globals browser should server */

import { login, logout} from "./lib";

let user;
let userId;

describe("Dashboard UI", function() {
    beforeEach(function() {
        server.call("test.resetdb");
    });

    describe("User not logged in", function() {
        it("Should be redirected to login", function() {
            browser.url("http://localhost:3000/dashboard");
            browser.getUrl().should.equal("http://localhost:3000/login");
        });

    });

    describe("User logged in", function() {
        beforeEach(function() {
            //Store user credentials
            user = server.call("test.create-user");

            userId = login(user);

            //Go to url
            browser.url("http://localhost:3000/dashboard");

        });

        afterEach(function() {
            logout();
        });

        it("Should not be redirected to login", function() {
            browser.getUrl().should.equal("http://localhost:3000/dashboard");
        });

        it("Should be able to see list of recipes", function() {
            const numOfRecipes = 3;

            //Generate new recipes connected to logged in user
            server.call("test.generate-recipes", numOfRecipes, userId);

            //Go to dashboard
            browser.url("http://localhost:3000/dashboard");

            //Wait for page to load
            browser.waitForExist(".recipe-list li");

            //Should see all recipes in list
            browser.elements(".recipe-list li").value.length.should.equal(numOfRecipes);
        });

        it("Should not see or access other users recipes", function() {
            const numOfRecipes = 3;

            let recipes = server.call("test.generate-recipes", numOfRecipes);

            browser.url("http://localhost:3000/dashboard");

            //Wait for page load
            browser.waitForExist(".recipe-list");

            //Check so no recipe is visible
            browser.elements(".recipe-list li").value.length.should.equal(0);

            //Try to go to another users recipe
            browser.url(`http://localhost:3000/recipe/${recipes[0]._id}`);
            browser.pause(1000);

            //Make sure user ends up on dashboard page
            browser.getUrl().should.equal("http://localhost:3000/dashboard");
        });

        it("Should be able to add recipe and get redirected to recipe page", function() {
            //Wait for page load
            browser.waitForExist("button.create-recipe");

            //Add new recipe
            browser.click("button.create-recipe");

            //Get information about added recipe
            let recipe = server.call("test.get-recipes")[0];

            //Should be on recipe page with correct recipe id
            browser.getUrl().should.equal(`http://localhost:3000/recipe/${recipe._id}`);
        });

        it("Should be able to delete a recipe", function() {
            const numOfRecipes = 3;

            //Generate new recipes connected to logged in user
            server.call("test.generate-recipes", numOfRecipes, userId);

            //Go to dashboard
            browser.url("http://localhost:3000/dashboard");

            //Wait for page to load
            browser.waitForExist(".recipe-list li");

            //delete recipe
            browser.click(".recipe-list li button.delete");

            //Confirm
            browser.click(".recipe-list li button.delete");

            //Should have one less recipe
            browser.elements(".recipe-list li").value.length.should.equal(numOfRecipes -1);
        });

    });
});