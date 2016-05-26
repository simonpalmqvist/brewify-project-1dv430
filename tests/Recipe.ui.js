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
let styles;
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
        styles = server.call("test.generate-styles", 30);

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

            //Set new batch size
            browser.setValue(query, newBatchSize);

            //Press enter and save
            browser.keys(["Enter"]);

            //Batch size should be updated on client
            browser.getValue(query).should.equal(newBatchSize.toString());

            //Batch size should be updated on server
            server.call("test.get-recipes")[0].batchSize.should.equal(newBatchSize);
        });

        it("Should be able to set boil time", function() {
            const newBoilTime = faker.random.number({min: 30, max: 1000});

            query = ".main-settings input[name=boilTime]";

            //Set new boil time
            browser.setValue(query, newBoilTime);

            //Press enter and save
            browser.keys(["Enter"]);

            //Boil time should be updated on client
            browser.getValue(query).should.equal(newBoilTime.toString());

            //Boil time should be updated on server
            server.call("test.get-recipes")[0].boilTime.should.equal(newBoilTime);
        });
    });

    describe("Settings", function() {

        it("Should be able to set mash efficiency", function() {
            //Hardcoded to in later test case be able to test calculations
            const newEfficiency = 80;

            query = ".settings-info input[name=efficiency]";

            //Set new efficiency
            browser.setValue(query, newEfficiency);

            //Press enter and save
            browser.keys(["Enter"]);

            //Efficiency should be updated on client
            browser.getValue(query).should.equal(newEfficiency.toFixed(2));

            //Efficiency should be updated on server
            server.call("test.get-recipes")[0].efficiency.should.equal(newEfficiency);
        });

        it("Should be able to set expected loss in brew kettle", function() {
            //Hardcoded to in later test case be able to test calculations
            const newLoss = 2;

            query = ".settings-info input[name=boilLoss]";

            //Set new loss
            browser.setValue(query, newLoss);

            //Press enter and save
            browser.keys(["Enter"]);

            //loss should be updated on client
            browser.getValue(query).should.equal(newLoss.toString());

            //loss should be updated on server
            server.call("test.get-recipes")[0].boilLoss.should.equal(newLoss);
        });

        it("Should be able to set expected loss in fermenter", function() {
            //Hardcoded to in later test case be able to test calculations
            const newLoss = 1;

            query = ".settings-info input[name=fermenterLoss]";

            //Set new loss
            browser.setValue(query, newLoss);

            //Press enter and save
            browser.keys(["Enter"]);

            //loss should be updated on client
            browser.getValue(query).should.equal(newLoss.toString());

            //loss should be updated on server
            server.call("test.get-recipes")[0].fermenterLoss.should.equal(newLoss);
        });

    });

    describe("Fermentables", function() {

        it("Should be able to add an fermentable from list", function() {
            const fermentableName = fermentables[5].name;
            const searchString = fermentableName.substring(0, fermentableName.length  -2);
            query = "form.add-fermentable input";

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
            browser.getValue(".recipe-fermentables tbody tr:nth-Child(1) td input.c-autocomplete")
                .should.equal(fermentableName);
        });

        it("Should be able to change fermentables expected EBC", function() {
            const newEBC = 591;
            query = ".recipe-fermentables tbody tr:nth-Child(1) input[name=ebc]";

            //Set new EBC
            browser.setValue(query, newEBC);

            //Press enter and save
            browser.keys(["Enter"]);

            //ebc should be updated on client
            browser.getValue(query).should.equal(newEBC.toString());
        });

        it("Should be able to change fermentables expected potential", function() {
            const newPotential = 1.025;
            query = ".recipe-fermentables tbody tr:nth-Child(1) input[name=potential]";

            //Set new Potential
            browser.setValue(query, newPotential);

            //Press enter and save
            browser.keys(["Enter"]);

            //potential should be updated on client
            browser.getValue(query).should.equal(newPotential.toFixed(3));
        });

        it("Should be able to change fermentables amount", function() {
            const newAmount = 0.2;
            query = ".recipe-fermentables tbody tr:nth-Child(1) input[name=amount]";

            //Set new amount
            browser.setValue(query, newAmount);

            //Press enter and save
            browser.keys(["Enter"]);

            //amount should be updated on client
            browser.getValue(query).should.equal(newAmount.toFixed(3));
        });

        it("Should be able to add a custom fermentable", function() {
            const searchString = faker.lorem.words();
            query = "form.add-fermentable input";

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

            //Set fermentable values for testing of calculations
            [
                {field: "ebc", value: 5},
                {field: "potential", value: 1.035},
                {field: "amount", value: 4.8}
            ].forEach(({field, value}) => {
                browser.setValue(`.recipe-fermentables tbody tr:nth-Child(2) input[name=${field}]`, value);
                browser.keys(["Enter"]);
            });

        });

        it("Should have correct amount percentage for each fermentable", function() {

            //Check so first row have 4 % of the total fermentable amount
            browser.getValue(".recipe-fermentables tbody tr:nth-Child(1) input[name=totalFermentables]")
                .should.equal("4.00");

            //Check so second row have 96 % of the total fermentable amount
            browser.getValue(".recipe-fermentables tbody tr:nth-Child(2) input[name=totalFermentables]")
                .should.equal("96.00");
        });

        it("Should have correct total amount of fermentables in recipe", function() {

            //Check so totalt weight of fermentables is 5 kg
            browser.getValue(".recipe-fermentables tfoot input[name=fermentableWeight]")
                .should.equal("5.000");

        });

    });

    describe("Hops", function() {
        it("Should be able to add hop", function() {
            const hopName = hops[5].name;
            const searchString = hopName.substring(0, hopName.length  -2);
            query = "form.add-hop input";

            //Focus on field
            browser.click(query);

            //Type a search
            browser.setValue(query, searchString);

            //Take first result
            browser.keys(["Down arrow", "Enter"]);

            //Wait for row
            browser.waitForExist(".recipe-hops tbody tr");

            //Check so one row exists
            browser.elements(".recipe-hops tbody tr").value.length.should.equal(1);

            //Validate the name
            browser.getValue(".recipe-hops tbody tr:nth-Child(1) td input.c-autocomplete")
                .should.equal(hopName);
        });

        it("Should be able to change hop form", function() {
            const PELLETS = 2;
            query = ".recipe-hops tbody tr:nth-Child(1) select";

            //Set new form to pellets
            browser.selectByValue(query, PELLETS);

            //Form should be updated on client
            browser.getValue(query).should.equal(PELLETS.toString());
        });

        it("Should be able to change hops alpha acid", function() {
            const newAlpha = 7.0;
            query = ".recipe-hops tbody tr:nth-Child(1) input[name=alpha]";

            //Set new alpha acid
            browser.setValue(query, newAlpha);

            //Press enter and save
            browser.keys(["Enter"]);

            //Alpha acid should be updated on client
            browser.getValue(query).should.equal(newAlpha.toFixed(2));
        });

        it("Should be able to change hops amount", function() {
            const newAmount = 30;
            query = ".recipe-hops tbody tr:nth-Child(1) input[name=amount]";

            //Set new amount
            browser.setValue(query, newAmount);

            //Press enter and save
            browser.keys(["Enter"]);

            //amount should be updated on client
            browser.getValue(query).should.equal(newAmount.toString());
        });

        it("Should be able to change hops boil time", function() {
            const newBoilTime = 15;
            query = ".recipe-hops tbody tr:nth-Child(1) input[name=time]";

            //Set new boil time
            browser.setValue(query, newBoilTime);

            //Press enter and save
            browser.keys(["Enter"]);

            //Boil time should be updated on client
            browser.getValue(query).should.equal(newBoilTime.toString());
        });

        it("Should inherit earlier set alpha acid when adding hop sort again", function() {
            const hopName = hops[5].name;
            const searchString = hopName.substring(0, hopName.length  -2);
            query = "form.add-hop input";

            //Focus on field
            browser.click(query);

            //Type a search
            browser.setValue(query, searchString);

            //Take first result
            browser.keys(["Down arrow", "Enter"]);

            //Wait for row
            browser.waitForExist(".recipe-hops tbody tr");

            //Check so two rows exists
            browser.elements(".recipe-hops tbody tr").value.length.should.equal(2);

            //Validate so alpha acid has been inherited
            browser.getValue(".recipe-hops tbody tr:nth-Child(1) input[name=alpha]")
                .should.equal("7.00");
        });

        it("Should sort table descending on boil time when value changes", function() {
            //Set values for row 2
            [
                {field: "amount", value: 50},
                {field: "time", value: 60}
            ].forEach(({field, value}) => {
                browser.setValue(`.recipe-hops tbody tr:nth-Child(2) input[name=${field}]`, value);
                browser.keys(["Enter"]);
            });

            //Row 2 should now be placed as row 1 because of a longer boil time
            browser.getValue(".recipe-hops tbody tr:nth-Child(1) input[name=amount]")
                .should.equal("50");
            //Row 1 = Row 2
            browser.getValue(".recipe-hops tbody tr:nth-Child(2) input[name=amount]")
                .should.equal("30");
        });

    });

    describe("Other ingredients", function() {

        it("Should be able to add other ingredient", function() {
            const ingredientName = ingredients[5].name;
            const searchString = ingredientName.substring(0, ingredientName.length  -2);
            query = "form.add-ingredient input";

            //Focus on field
            browser.click(query);

            //Input search string
            browser.setValue(query, searchString);

            //Choose first selection
            browser.keys(["Down arrow", "Enter"]);

            //Wait so row gets created
            browser.waitForExist(".recipe-ingredients tbody tr");

            //Should have one new ingredient
            browser.elements(".recipe-ingredients tbody tr").value.length.should.equal(1);

            //Validate the name
            browser.getValue(".recipe-ingredients tbody tr:nth-Child(1) td input.c-autocomplete")
                .should.equal(ingredientName);
        });
    });

    describe("Yeast", function() {

        it("Should be able to add yeast", function() {
            const yeastName = yeasts[5].name;
            const searchString = yeastName.substring(0, yeastName.length  -2);
            query = "form.add-yeast input";

            //fix since it might be hidden behind fixed navbar
            browser.scroll(0,0);

            //Focus on field
            browser.click(query);

            //Input search string
            browser.setValue(query, searchString);

            //Choose first selection
            browser.keys(["Down arrow", "Enter"]);

            //Wait so yeast is added
            browser.waitForExist(".yeast-info");

            //Should not show add input
            browser.isExisting(query).should.be.false;

            //Validate the name
            browser.getValue(".yeast-info form input.c-autocomplete")
                .should.equal(yeastName);
        });

        it("Should be able to change yeast form", function() {
            const DRY = 2;
            query = ".yeast-info select[name=form]";

            //Set new form to dry yeast
            browser.selectByValue(query, DRY);

            //form should be updated on client
            browser.getValue(query).should.equal(DRY.toString());
        });

        it("Should be able to change yeast type", function() {
            const ALE = 1;
            query = ".yeast-info select[name=type]";

            //Set new type to ale yeast
            browser.selectByValue(query, ALE);

            //type should be updated on client
            browser.getValue(query).should.equal(ALE.toString());
        });

        it("Should be able to change yeasts attenuation", function() {
            const newAttenuation = 75;
            query = ".yeast-info input[name=attenuation]";

            //Set new amount
            browser.setValue(query, newAttenuation);

            //Press enter and save
            browser.keys(["Enter"]);

            //amount should be updated on client
            browser.getValue(query).should.equal(newAttenuation.toFixed(2));
        });
    });

    describe("Beer style", function() {

        it("Should be able to add style", function() {
            const styleName = styles[5].name;
            const searchString = styleName.substring(0, styleName.length  -2);
            query = "form.add-style input";

            //Focus on field
            browser.click(query);

            //Input search string
            browser.setValue(query, searchString);

            //Choose first selection
            browser.keys(["Down arrow", "Enter"]);

            //Wait so style is added
            browser.waitForExist(".style-info");

            //Should not show add input
            browser.isExisting(query).should.be.false;

            //Validate the name
            browser.getValue(".style-info form input.c-autocomplete")
                .should.equal(styleName);
        });
    });

    describe("Calculations", function() {

        it("Should give correct calculations on expected OG", function() {
            const expectedOG = 1.058;
            query = ".recipe-info input[name=expectedOG]";

            browser.getValue(query).should.equal(expectedOG.toFixed(3));
        });

        it("Should give correct calculations on expected FG", function() {
            const expectedFG = 1.015;
            query = ".recipe-info input[name=expectedFG]";

            browser.getValue(query).should.equal(expectedFG.toFixed(3));
        });

        it("Should give correct calculations on expected ABV", function() {
            const expectedABV = 5.6;
            query = ".recipe-info input[name=expectedABV]";

            browser.getValue(query).should.equal(expectedABV.toFixed(1));
        });

        it("Should give correct calculations on expected IBU", function() {
            const expectedIBU = 56.1;
            query = ".recipe-info input[name=expectedIBU]";

            browser.getValue(query).should.equal(expectedIBU.toString());
        });

        it("Should give correct calculations on expected EBC", function() {
            const expectedEBC = 57;
            query = ".recipe-info input[name=expectedEBC]";

            browser.getValue(query).should.equal(expectedEBC.toString());
        });

        it("Should give correct calculations on expected bitterness ratio", function() {
            const bitternessRatio = 0.97;
            query = ".recipe-info input[name=bitternessRatio]";

            browser.getValue(query).should.equal(bitternessRatio.toString());
        });

        it("Should show expected wort after boil", function() {
            const wortAfterBoil = 20;
            query = ".recipe-info input[name=wortAfterBoil]";

            browser.getValue(query).should.equal(wortAfterBoil.toString());
        });
    });
});