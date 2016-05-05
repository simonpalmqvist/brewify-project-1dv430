/**
 * @description Recipe page, page for editing and creating recipes
 * @author simonpalmqvist
 */

import React from "react";
import ReactDOM from "react-dom";
import { _ } from "meteor/underscore";
import { createContainer } from "meteor/react-meteor-data";
import { connect }  from "react-redux";

import { updateRecipe } from "../actions/RecipeActions";

import { Recipes } from "../../api/recipes/Recipes";
import { RecipeFermentables } from "../../api/recipes/fermentables/RecipeFermentables";
import { RecipeHops } from "../../api/recipes/hops/RecipeHops";
import { RecipeYeasts } from "../../api/recipes/yeasts/RecipeYeasts";
import { RecipeIngredients } from "../../api/recipes/ingredients/RecipeIngredients";
import { Fermentables } from "../../api/brewerydb/Fermentables";
import { Hops } from "../../api/brewerydb/Hops";
import { Yeasts } from "../../api/brewerydb/Yeasts";
import { Ingredients } from "../../api/brewerydb/Ingredients";

import {
    calcExpectedOg,
    calcExpectedFg,
    calcExpectedIBU,
    calcBeerEbc,
    calcIngredientWeight
} from "../helpers/beerCalc";

import { HOPS } from "../helpers/recipeStandards";

import Input from "../components/base/Input";
import FermentablesList from "../components/recipe/FermentablesList";
import HopsList from "../components/recipe/HopsList";
import YeastInfo from "../components/recipe/YeastInfo";
import IngredientsList from "../components/recipe/IngredientsList";

class Recipe extends React.Component {

    update(value) {
        updateRecipe(this.props.recipe._id, value);
    }

    recipeValidateOne(key, value) {
        let obj = {};
        obj[key] = value;
        return Recipes.schema.newContext().validateOne(obj, key);
    }

    render() {
        const update = this.update.bind(this);
        const {
            recipe,
            recipeFermentables,
            recipeHops,
            recipeYeast,
            recipeIngredients,
            fermentables,
            hops,
            yeasts,
            ingredients,
            mobile } = this.props;

        const attenuation = recipeYeast ? recipeYeast.attenuation : 0;
        const expectedOG = calcExpectedOg(recipeFermentables, recipe);
        const expectedFG = calcExpectedFg(attenuation, expectedOG);
        const expectedIBU = calcExpectedIBU(recipeHops, recipe, expectedOG);
        const expectedEBC = calcBeerEbc(recipeFermentables, recipe);

        return (
            <div>
                <div className="col-height-wrapper">

                    <div className="content-box full-width-mobile col-3-4">
                        <Input name="name"
                               value={recipe.name}
                               className={["input-header", "glass"]}
                               attr={{type: "text"}}
                               validate={this.recipeValidateOne}
                               onUpdate={update}/>

                        <div className="responsive-info recipe-info">
                            <Input name="batchSize"
                                   label="Batch size (l)"
                                   attr={{type: "number"}}
                                   value={recipe.batchSize}
                                   validate={this.recipeValidateOne}
                                   onUpdate={update}/>
                            <Input name="boilTime"
                                   label="Boil time (min)"
                                   attr={{type: "number"}}
                                   value={recipe.boilTime}
                                   validate={this.recipeValidateOne}
                                   onUpdate={update}/>
                            <Input attr={{type: "number", disabled: true}}
                                   fixedDecimals={3}
                                   name="expextedOG"
                                   label="OG"
                                   value={expectedOG} />
                            <Input attr={{type: "number", disabled: true}}
                                   fixedDecimals={3}
                                   name="expextedFG"
                                   label="FG"
                                   value={expectedFG} />
                            <Input attr={{type: "number", disabled: true}}
                                   name="expectedIBU"
                                   label="IBU"
                                   value={expectedIBU} />
                            <Input attr={{type: "number", disabled: true}}
                                   name="expectedEBC"
                                   label="EBC"
                                   value={expectedEBC} />
                        </div>
                    </div>

                    <div className="content-box full-width-mobile col-1-4">
                        <h2>Beer style</h2>
                    </div>

                </div>

                <div className="col-height-wrapper">

                    <div className="content-box extract full-width-mobile col-3-4">
                        <FermentablesList
                            mobile={mobile}
                            fermentables={fermentables}
                            recipeFermentables={recipeFermentables}
                            fermentableWeight={calcIngredientWeight(recipeFermentables)}
                            recipeId={this.props.recipe._id}/>
                    </div>

                    <div className="content-box yeast full-width-mobile col-1-4">
                        <YeastInfo
                            mobile={mobile}
                            recipeYeast={recipeYeast}
                            yeasts={yeasts}
                            recipeId={this.props.recipe._id} />
                    </div>
                </div>
                <div className="col-height-wrapper">
                    <div className="content-box hops full-width-mobile col-3-4">
                        <HopsList
                            mobile={mobile}
                            hops={hops}
                            recipeHops={recipeHops}
                            use={HOPS.USE.BOIL}
                            hopWeight={calcIngredientWeight(recipeHops)}
                            recipeId={this.props.recipe._id}/>
                    </div>
                    <div className="content-box full-width-mobile col-1-4">
                        <h2>Settings</h2>
                    </div>
                </div>
                <div className="col-height-wrapper">
                    <div className="content-box other-ingredients full-width-mobile col-3-4">
                        <IngredientsList
                            mobile={mobile}
                            ingredients={ingredients}
                            recipeIngredients={recipeIngredients}
                            recipeId={this.props.recipe._id}/>
                    </div>
                    <div className="content-box full-width-mobile col-1-4"></div>
                </div>
            </div>
        );
    }
}

Recipe.defaultProps = {
    recipe: {},
    recipeFermentables: [],
    recipeHops: [],
    recipeIngredients: [],
    fermentables: [],
    hops: [],
    yeasts: [],
    ingredients: []
};

function joinArrayUniqByName(arr1, arr2) {
    //Create copy of array and get the latest added
    arr1 = arr1.slice(0).reverse();

    //Return array with unique names on objects
    return _.uniq([...arr1, ...arr2], (item) => item.name);
}

function getIngredientsForRecipe(list, id) {
    return list.filter((item) => item.recipeId === id);
}


//Creates meteor container to provide subscribed data
const RecipeContainer = createContainer(({params}) => {
    const { id }          = params;
    const allFermentables = RecipeFermentables.find().fetch();
    const allHops         = RecipeHops.find().fetch();
    const allYeasts       = RecipeYeasts.find().fetch();
    const allIngredients  = RecipeIngredients.find().fetch();

    //Prepend the product ID to yeast name
    let yeasts = Yeasts.find().fetch().map((yeast) => {
        const {name, productId} = yeast;
        yeast.name = productId ? `${productId} ${name}` : name;
        return yeast;
    });

    return {
        recipe:             Recipes.findOne(id),
        recipeFermentables: getIngredientsForRecipe(allFermentables, id),
        recipeHops:         getIngredientsForRecipe(allHops, id),
        recipeYeast:        getIngredientsForRecipe(allYeasts, id)[0],
        recipeIngredients:  getIngredientsForRecipe(allIngredients, id),
        fermentables:       joinArrayUniqByName(allFermentables, Fermentables.find().fetch()),
        hops:               joinArrayUniqByName(allHops, Hops.find().fetch()),
        yeasts:             joinArrayUniqByName(allYeasts, yeasts),
        ingredients:        joinArrayUniqByName(allIngredients, Ingredients.find().fetch())
    };
}, Recipe);

//Map the current state to the properties in component
function mappingStateToProps({ flashMessages, browser }) {
    return {
        save: flashMessages.save,
        error: flashMessages.error
    };
}

export default connect(mappingStateToProps)(RecipeContainer);