/* eslint-env mocha */
// These are Chimp globals
/* globals browser should server */
/**
 * @description Acceptance test for the authentication feature #5
 * @author simonpalmqvist
 */

import { login, logout} from "./lib";
import faker from "faker";

let user;

describe("Authentication UI", () => {
    beforeEach(() => {
        server.call("test.resetdb");

        //Go to url
        browser.url("http://localhost:3000");

    });

    afterEach(() => {
        logout();
    });

    describe("New user", () => {
        it("Should be able to create a new account", () => {
            browser.click(`a[href="/register"]`);

            browser.setValue("input[name=email]", faker.internet.email());
            browser.setValue("input[name=password]", faker.internet.password());

            browser.leftClick("input[type=submit]");

            browser.pause(1000);
            browser.getUrl().should.equal("http://localhost:3000/dashboard");
        });

    });

    describe("User", () => {
        beforeEach(() => {
            //Store user credentials
            user = server.call("test.create-user");
        });

        it("Should be able to login", () => {
            browser.click(`a[href="/login"]`);

            browser.setValue("input[name=email]", user.email);
            browser.setValue("input[name=password]", user.password);

            browser.leftClick("input[type=submit]");

            browser.pause(1000);
            browser.getUrl().should.equal("http://localhost:3000/dashboard");
        });

        it("Should be able to logout", () => {
            login(user);

            browser.click(`a[href="/logout"]`);

            browser.pause(1000);
            browser.getUrl().should.equal("http://localhost:3000/");
        });
    });

/*    describe("User logged in", () => {


        afterEach(() => {
            logout();
        });

        it("Should not be redirected to login", () => {
            browser.getUrl().should.equal("http://localhost:3000/dashboard");
        });

        it("Should be able to see list of items", () => {
            const numOfItems = 3;

            server.call("test.generate-items", numOfItems);

            browser.waitForExist("ul");

            const elements = browser.elements(".list-items li");

            elements.value.length.should.equal(numOfItems);
        });

        it("Should be able to add items", () => {
            const newItem = "testing";

            browser.waitForExist("input");

            browser.click("input");

            browser.setValue("input", newItem);

            browser.keys("Enter");

            expect(browser.getText(".list-items li")).to.equal(newItem);
        });

    });*/
});