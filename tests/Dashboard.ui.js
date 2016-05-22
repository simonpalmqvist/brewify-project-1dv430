/* eslint-env mocha */
// These are Chimp globals
/* globals browser should server */

import { login, logout} from "./lib";

let user;
let userId;

describe("Dashboard UI", () => {
    beforeEach(() => {
        server.call("test.resetdb");
    });

    describe("User not logged in", () => {
        it("Should be redirected to login", () => {
            browser.url("http://localhost:3000/dashboard");
            browser.getUrl().should.equal("http://localhost:3000/login");
        });

    });

    describe("User logged in", () => {
        beforeEach(() => {
            //Store user credentials
            user = server.call("test.create-user");

            userId = login(user);

            //Go to url
            browser.url("http://localhost:3000/dashboard");

        });

        afterEach(() => {
            logout();
        });

        it("Should not be redirected to login", () => {
            browser.getUrl().should.equal("http://localhost:3000/dashboard");
        });

        it("Should be able to see list of recipes", () => {
            const numOfRecipes = 3;

            let recipes = server.call("test.generate-recipes", numOfRecipes, userId);

            browser.url("http://localhost:3000/dashboard");

            browser.waitForExist(".recipe-list li");

            const elements = browser.elements(".recipe-list li");

            elements.value.length.should.equal(numOfRecipes);
        });

        it("Should be able to add recipe", () => {
            browser.waitForExist("button");

            browser.click("button");

            let recipe = server.call("test.get-recipes")[0];

            browser.getUrl().should.equal(`http://localhost:3000/recipe/${recipe._id}`);
        });
    });
});