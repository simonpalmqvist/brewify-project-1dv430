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
let yeasts;
let ingredients;
let query;

describe("Recipe UI - Create a recipe", function() {

    //increase timeout
    this.timeout(5000);

    before(function() {
        server.call("test.resetdb");
        user = server.call("test.create-user");

        userId = login(user);

        recipe = server.call("test.generate-recipes", 1, userId)[0];
        fermentables = server.call("test.generate-fermentables", 30);
        hops = server.call("test.generate-hops", 30);
        yeasts = server.call("test.generate-yeasts", 30);
        ingredients = server.call("test.generate-ingredients", 30);

        //Go to url
        browser.url(`http://localhost:3000/recipe/${recipe._id}`);

    });

    after(function() {
        logout();
    });

    describe("Main", function() {
        it("Should be able to change name", function() {
            const newName = faker.lorem.words();

            query = ".main-settings input[name=name]";

            browser.waitForExist(query);

            //Set new name
            browser.setValue(query, newName);

            //Press enter and save
            browser.keys(["Enter"]);

            //Name should be updated on client
            browser.getValue(query).should.equal(newName);

            //Name should be updated on server
            server.call("test.get-recipes")[0].name.should.equal(newName);
        });

        it("Should be able to set batch size", function() {
            //Hardcoded to in later test case be able to test calculations
            const newBatchSize = 17;

            query = ".main-settings input[name=batchSize]";

            browser.waitForExist(query);

            //Set new batch size
            browser.setValue(query, newBatchSize);

            //Press enter and save
            browser.keys(["Enter"]);

            //Name should be updated on client
            browser.getValue(query).should.equal(newBatchSize.toString());

            //Name should be updated on server
            server.call("test.get-recipes")[0].batchSize.should.equal(newBatchSize);
        });

        it("Should be able to set boil time", function() {
            const newBoilTime = faker.random.number({min: 30, max: 1000});

            query = ".main-settings input[name=boilTime]";

            browser.waitForExist(query);

            //Set new boil time
            browser.setValue(query, newBoilTime);

            //Press enter and save
            browser.keys(["Enter"]);

            //Name should be updated on client
            browser.getValue(query).should.equal(newBoilTime.toString());

            //Name should be updated on server
            server.call("test.get-recipes")[0].boilTime.should.equal(newBoilTime);
        });
    });

    describe("Settings", function() {

        it("Should be able to set mash efficiency", function() {
            //Hardcoded to in later test case be able to test calculations
            const newEfficiency = 80;

            query = ".settings-info input[name=efficiency]";

            browser.waitForExist(query);

            //Set new efficiency
            browser.setValue(query, newEfficiency);

            //Press enter and save
            browser.keys(["Enter"]);

            //Name should be updated on client
            browser.getValue(query).should.equal(newEfficiency.toFixed(2));

            //Name should be updated on server
            server.call("test.get-recipes")[0].efficiency.should.equal(newEfficiency);
        });

        it("Should be able to set expected loss in brew kettle", function() {
            //Hardcoded to in later test case be able to test calculations
            const newLoss = 2;

            query = ".settings-info input[name=boilLoss]";

            browser.waitForExist(query);

            //Set new loss
            browser.setValue(query, newLoss);

            //Press enter and save
            browser.keys(["Enter"]);

            //Name should be updated on client
            browser.getValue(query).should.equal(newLoss.toString());

            //Name should be updated on server
            server.call("test.get-recipes")[0].boilLoss.should.equal(newLoss);
        });

        it("Should be able to set expected loss in fermenter", function() {
            //Hardcoded to in later test case be able to test calculations
            const newLoss = 1;

            query = ".settings-info input[name=fermenterLoss]";

            browser.waitForExist(query);

            //Set new loss
            browser.setValue(query, newLoss);

            //Press enter and save
            browser.keys(["Enter"]);

            //Name should be updated on client
            browser.getValue(query).should.equal(newLoss.toString());

            //Name should be updated on server
            server.call("test.get-recipes")[0].fermenterLoss.should.equal(newLoss);
        });

    });

    describe("Fermentables", function() {

        it("Should be able to add an fermentable from list", function() {
            const searchString = fermentables[5].name.split(" ")[0];
            query = "form.add-fermentable input";

            browser.waitForExist(query);

            //Focus on search/add field
            browser.click(query);

            //Set a search
            browser.setValue(query, searchString);

            //Take first result
            browser.keys(["Down arrow","Enter"]);

            //Wait for row
            browser.waitForExist(".recipe-fermentables tbody tr");

            //Check so one row exists
            browser.elements(".recipe-fermentables tbody tr").value.length.should.equal(1);

            //Validate the name
            browser.getValue(".recipe-fermentables tbody tr td input.c-autocomplete")
                .should.equal(fermentables[5].name);
        });

        it("Should be able to add a custom fermentable", function() {
            const searchString = faker.lorem.words();
            query = "form.add-fermentable input";

            browser.waitForExist(query);

            //Focus on search/add field
            browser.click(query);

            //Set a search
            browser.setValue(query, searchString);

            //Add custom fermentable
            browser.keys(["Enter"]);

            //Wait for row
            browser.waitForExist(".recipe-fermentables tbody tr:nth-Child(2)");

            //Check so two rows exists
            browser.elements(".recipe-fermentables tbody tr").value.length.should.equal(2);

            //Validate the name
            browser.getValue(".recipe-fermentables tbody tr:nth-Child(2) td input.c-autocomplete")
                .should.equal(searchString);
        });

    });
/*
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

        browser.waitForExist("form.add-fermentable input");

        browser.click("form.add-fermentable input");

        browser.setValue("form.add-fermentable input", searchString);

        browser.keys(["Down arrow","Enter"]);

        browser.waitForExist(".recipe-fermentables tbody tr");

        const elements = browser.elements(".recipe-fermentables tbody tr");

        //Should have one new fermentable
        elements.value.length.should.equal(1);
    });

    //TODO: TEST Change fermentable value, See so same fermentable has new value
    //TODO: TEST Create own fermentable

    it("Should be able to add hop", function() {
        const searchString = hops[5].name.split(" ")[0];

        browser.waitForExist("form.add-hop input");

        browser.click("form.add-hop input");

        browser.setValue("form.add-hop input", searchString);

        browser.keys(["Down arrow", "Enter"]);

        browser.waitForExist(".recipe-hops tbody tr");

        const elements = browser.elements(".recipe-hops tbody tr");

        //Should have one new hop
        elements.value.length.should.equal(1);
    });

    it("Should be able to add yeast", function() {
        const searchString = yeasts[5].name.split(" ")[0];

        browser.waitForExist("form.add-yeast input");

        browser.click("form.add-yeast input");

        browser.setValue("form.add-yeast input", searchString);

        browser.keys(["Down arrow","Enter"]);

        browser.waitForExist(".yeast-info form input.c-autocomplete");

        //Should have yeast
        browser.getValue(".yeast-info form input.c-autocomplete").should.equal(yeasts[5].name);
    });

    it("Should be able to add other ingredient", function() {
        const searchString = ingredients[5].name.split(" ")[0];

        browser.waitForExist("form.add-ingredient input");

        browser.click("form.add-ingredient input");

        browser.setValue("form.add-ingredient input", searchString);

        browser.keys(["Down arrow", "Enter"]);

        browser.waitForExist(".recipe-ingredients tbody tr");

        const elements = browser.elements(".recipe-ingredients tbody tr");

        //Should have one new hop
        elements.value.length.should.equal(1);
    });
    */
});

/*
Test scope

MAIN

1. Should be able to set name

2. Should be able to set batch size

3. Should be able to set boil time

SETTINGS

4. Should be able to change mash efficiency 80%

5. Should be able to change loss in brew-kettle 2

6. Should be able to change loss in fermenter 1

FERMENTABLE

7. Add fermentable

8. Change ebc to 591.

9. Change Potential 1,025

10. Change amount 0,200

11. Add another fermentable 5, 1,035 4,8

12. Should have correct amount (%) 4,00 96,00

13. Should have correct total amount of kg

HOPS

14. Add hop

15. Change form PELLETS.

16. Alpha acid 7,00

17. Amount 30

18. Boiltime

19. Add same hop should inherit alpha acid (change amount 50)

20. Should be sorted first with higher boil time (60)

21. Should have correct total amount of kg

OTHER INGREDIENTS

22. Should be able to add ingredient

YEAST

23. Add yeast

24. Change form to dry yeast

25. Change type to ale yeast

26. Change attenuation

STYLE

27. Should be able to add a style

FINAL

28. Recipe should have OG of 1,058

29. Recipe should have FG of 1,015

30. Recipe should have ABV of 5,6

31. Recipe should have IBU of 56,1

32. Recipe should have EBC of 57

 */