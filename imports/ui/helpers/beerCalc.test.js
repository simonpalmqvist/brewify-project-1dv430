/* eslint-env mocha */
/**
 * @description Unit tests for beer calculations
 * @author simonpalmqvist
 */


import { Meteor } from "meteor/meteor";
import { should } from "meteor/practicalmeteor:chai";

import {
    srmToEbc,
    calcBeerEbc,
    ebcToHex,
    calcExpectedABV,
    calcExpectedIBU,
    calcExpectedOg,
    calcExpectedFg,
    calcIngredientWeight
} from "./beerCalc";

import {
    HOPS
} from "./recipeStandards";

let recipe;

if (Meteor.isClient) {
    describe("Beer calculations", function() {
        beforeEach(function() {
            recipe = {efficiency: 80, batchSize: 8, boilLoss: 2, fermenterLoss: 0.5};
        });

        it("Should be able to convert SRM to EBC", function() {
            const srm = 2;
            const srm2 = 350;

            //Make sure function returns correct value
            srmToEbc(srm).should.equal(4);
            srmToEbc(srm2).should.equal(690);
        });

        it("Should be able to give an expected ABV", function() {
            const og = 1.055;
            const fg = 1.015;

            calcExpectedABV(og, fg).should.equal(5.25);
        });

        it("Should be able to give an expected IBU", function() {
            const og = 1.058;
            const hops = [
                {amount: 10, alpha: 10.5, time: 60, form: HOPS.FORM.PELLET},
                {amount: 20, alpha: 10.5, time: 30, form: HOPS.FORM.PELLET},
                {amount: 30, alpha: 10.5, time: 15, form: HOPS.FORM.PELLET}
            ];

            calcExpectedIBU(hops, recipe, og).should.equal(99.4);
        });

        it("Should be able to give an expected OG", function() {
            const fermentables = [
                {amount: 1.9, potential: 1.036},
                {amount: 0.1, potential: 1.033}
            ];

            calcExpectedOg(fermentables, recipe).should.equal(1.046);
        });

        it("Should be able to give an expected FG", function() {
            const attenuation = 83;
            const og = 1.058;

            calcExpectedFg(attenuation, og).should.equal(1.010);
        });

        it("Should be able to give calculate total weight of ingredients", function() {
            const fermentables = [
                {amount: 1.9},
                {amount: 0.10},
                {amount: 0.010},
                {amount: 0}
            ];

            calcIngredientWeight(fermentables).should.equal(2.010);
        });

        it("Should be able to calculate beers expected color in EBC", function() {
            const fermentables = [
                {amount: 2.3, ebc: 3},
                {amount: 0.1, ebc: 5}
            ];

            calcBeerEbc(fermentables, recipe).should.equal(6);
        });

        it("Should be able to return black as color for ebc over 80", function() {
            ebcToHex(Math.floor(Math.random() * 20) + 81).should.equal("#000000");
        });
    });
}
