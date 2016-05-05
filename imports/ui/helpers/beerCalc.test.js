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
    calcExpectedOg,
    calcExpectedFg,
    calcIngredientWeight
} from "./beerCalc";

if (Meteor.isClient) {
    describe("Beer calculations", function() {
        it("Should be able to convert SRM to EBC", function() {
            const srm = 2;
            const srm2 = 350;

            //Make sure function returns correct value
            srmToEbc(srm).should.equal(4);
            srmToEbc(srm2).should.equal(690);
        });

        it("Should be able to give an expected OG", function() {
            const fermentables = [
                {amount: 1.9, potential: 1.036},
                {amount: 0.1, potential: 1.033}
            ];
            const recipe = {batchSize: 8};

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

            const recipe = {batchSize: 8};

            calcBeerEbc(fermentables, recipe).should.equal(6);
        });

        it("Should be able to return black as color for ebc over 80", function() {
            ebcToHex(Math.floor(Math.random() * 20) + 81).should.equal("#000000");
        });
    });
}
