/* eslint-env mocha */
/**
 * @description Unit tests for beer calculations
 * @author simonpalmqvist
 */


import { Meteor } from "meteor/meteor";
import { should } from "meteor/practicalmeteor:chai";

import { srmToEbc, calcExpectedOg, calcFermentableWeight } from "./beerCalc";

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

        it("Should be able to give an expected OG", function() {
            const fermentables = [
                {amount: 1.9},
                {amount: 0.10},
                {amount: 0.010},
                {amount: 0}
            ];

            calcFermentableWeight(fermentables).should.equal(2.010);
        });
    });
}
