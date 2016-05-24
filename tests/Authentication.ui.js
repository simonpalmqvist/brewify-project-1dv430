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
        it("Should be able to create a new account and get redirected to brew profile page", () => {
            browser.click("a[href=\"/login\"]");

            browser.click("a[href=\"/register\"]");

            //Add wanted credentials
            browser.setValue("input[name=email]", faker.internet.email());
            browser.setValue("input[name=password]", faker.internet.password());

            //Submit information
            browser.leftClick("input[type=submit]");

            //Wait for brew profile to load and verify that user ends up on brew profile page
            browser.pause(1000);
            browser.getUrl().should.equal("http://localhost:3000/brew/profile");
        });

    });

    describe("User", () => {
        beforeEach(() => {
            //Store user credentials
            user = server.call("test.create-user");
        });

        it("Should be able to login", () => {
            browser.click("a[href=\"/login\"]");

            //Add users credentials
            browser.setValue("input[name=email]", user.email);
            browser.setValue("input[name=password]", user.password);

            //Submit
            browser.leftClick("input[type=submit]");

            //Wait to get logged in
            browser.pause(1000);
            browser.getUrl().should.equal("http://localhost:3000/dashboard");
        });

        it("Should be able to logout", () => {
            login(user);

            browser.url("http://localhost:3000/dashboard");

            //Click on logout
            browser.click("a.menu-icon");
            browser.click("a.logout-option");

            //Should return to home screen
            browser.pause(1000);
            browser.getUrl().should.equal("http://localhost:3000/");
        });
    });
});