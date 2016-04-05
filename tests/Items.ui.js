/* eslint-env mocha */
// These are Chimp globals
/* globals browser should server */

import { login, logout} from "./lib";

let user;

describe("Items UI", () => {
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

            login(user);

            //Go to url
            browser.url("http://localhost:3000/dashboard");

        });

        afterEach(() => {
            logout();
        });

        it("Should not be redirected to login", () => {
            browser.getUrl().should.equal("http://localhost:3000/dashboard");
        });

        it("Should be able to see list of items", () => {
            const numOfItems = 3;

            server.call("test.generate-items", numOfItems);

            browser.waitForExist(".list-items li");

            const elements = browser.elements(".list-items li");

            elements.value.length.should.equal(numOfItems);
        });

        it("Should be able to add items", () => {
            const newItem = "testing";

            browser.waitForExist("input");

            browser.click("input");

            browser.setValue("input", newItem);

            browser.keys("Enter");

            browser.waitForExist(".list-items li");

            expect(browser.getText(".list-items li")).to.equal(newItem);
        });

    });
});