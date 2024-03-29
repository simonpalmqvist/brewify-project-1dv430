/* eslint-env mocha */
/**
 * @description Unit tests for collection and collections methods
 * @author simonpalmqvist
 */


import { Meteor } from "meteor/meteor";
import { resetDatabase } from "meteor/xolvio:cleaner";
import chai from "meteor/practicalmeteor:chai";
import { sinon } from "meteor/practicalmeteor:sinon";

import { recipeIngredient, recipe } from "../../fakeData";

import { Recipes } from "../Recipes";
import { RecipeIngredients } from "./RecipeIngredients";

import "./methods";

const should = chai.should();
const { stub } = sinon;

if (Meteor.isServer) {

    //Getting the exposed methods
    const insertMethod = Meteor.server.method_handlers["recipes.ingredients.insert"];
    const updateMethod = Meteor.server.method_handlers["recipes.ingredients.update"];
    const removeMethod = Meteor.server.method_handlers["recipes.ingredients.remove"];

    let userId;
    let recipeId;
    let ingredientId;
    let ingredient;

    describe("Recipe Ingredients", function() {
        beforeEach(function() {
            //Reset database
            resetDatabase();

            ingredient = recipeIngredient();
            userId = ingredient.userId;
            recipeId = ingredient.recipeId;
        });

        after(function() {
            resetDatabase();
        });

        describe("collection", function() {

            it("Should be able to add ingredients to recipe", function() {
                ingredientId = RecipeIngredients.insert(ingredient);

                // Recipe ingredient should be added
                RecipeIngredients.find(ingredientId).count().should.equal(1);
            });

            it("Should not be able to add ingredients without name", function() {
                delete ingredient.name;

                (() => RecipeIngredients.insert(ingredient)).should.throw(Error);

                //Recipe ingredient should not be added
                RecipeIngredients.find({}).count().should.equal(0);
            });

            it("Should not be able to add ingredients without amount", function() {
                delete ingredient.amount;

                (() => RecipeIngredients.insert(ingredient)).should.throw(Error);

                //Recipe ingredient should not be added
                RecipeIngredients.find({}).count().should.equal(0);
            });

            it("Should not be able to add ingredients without added field", function() {
                delete ingredient.added;

                (() => RecipeIngredients.insert(ingredient)).should.throw(Error);

                //Recipe ingredient should not be added
                RecipeIngredients.find({}).count().should.equal(0);
            });

            it("Should not be able to add ingredients without time", function() {
                delete ingredient.time;

                (() => RecipeIngredients.insert(ingredient)).should.throw(Error);

                //Recipe ingredient should not be added
                RecipeIngredients.find({}).count().should.equal(0);
            });

            it("Should not be able to add ingredients without time type", function() {
                delete ingredient.timeType;

                (() => RecipeIngredients.insert(ingredient)).should.throw(Error);

                //Recipe ingredient should not be added
                RecipeIngredients.find({}).count().should.equal(0);
            });

        });

        describe("methods", () => {

            describe("Not authenticated", () => {
                it("Should not be able to insert new ingredient", function() {
                    (() => insertMethod(recipeId, name)).should.throw(Error);

                    RecipeIngredients.find({}).count().should.equal(0);
                });

                it("Should not be able to remove ingredient", function() {
                    ingredientId = RecipeIngredients.insert(ingredient);

                    (() => removeMethod(ingredientId)).should.throw(Error);

                    RecipeIngredients.find({}).count().should.equal(1);
                });

                it("Should not be able to update ingredient", function() {
                    ingredientId = RecipeIngredients.insert(ingredient);

                    (() => updateMethod(ingredientId, {name: recipeIngredient().name})).should.throw(Error);

                    RecipeIngredients.findOne(ingredientId).name.should.equal(ingredient.name);
                });
            });

            describe("Authenticated", function() {
                before(function() {
                    stub(Meteor, "userId", () => userId);
                });

                beforeEach(function() {
                    recipeId = Recipes.insert(recipe(userId));
                });

                after(function() {
                    Meteor.userId.restore();
                });


                it("Should be able to insert new ingredient", function() {

                    insertMethod(recipeId, ingredient.name);

                    RecipeIngredients.find({}).count().should.equal(1);
                });

                it("Should be able to remove hop", function() {
                    ingredientId = RecipeIngredients.insert(ingredient);

                    removeMethod(ingredientId);

                    RecipeIngredients.find({}).count().should.equal(0);
                });

                it("Should be able to update hop", function() {
                    let newName = recipeIngredient().name;

                    ingredientId = RecipeIngredients.insert(ingredient);

                    updateMethod(ingredientId, {name: newName});

                    RecipeIngredients.findOne(ingredientId).name.should.equal(newName);
                });
            });
        });
    });
}