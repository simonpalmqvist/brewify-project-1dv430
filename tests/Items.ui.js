/* eslint-env mocha */

// These are Chimp globals
/* globals browser expect server */

describe("Items ui", () => {
    beforeEach(() => {
        browser.url("http://localhost:3000");
        server.call("test.resetdb");
    });

    it("Should list items", () => {
        const numOfItems = 3;
        //server.call("items.insert","test");
        server.call("test.generate-items", numOfItems);
        browser.waitForExist("ul");

        const elements = browser.elements("li");

        expect(elements.value.length).to.equal(numOfItems);
    });

    it("Should add item", () => {
        const newItem = "testing";

        browser.waitForExist("input");

        browser.click("input");

        browser.setValue("input", newItem);

        browser.keys("Enter");

        expect(browser.getText("li")).to.equal(newItem);
    });
});