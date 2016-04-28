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
import { Fermentables } from "../../api/brewerydb/Fermentables";
import { Hops } from "../../api/brewerydb/Hops";
import { Yeasts } from "../../api/brewerydb/Yeasts";

import { calcExpectedOg, calcExpectedIBU, calcIngredientWeight } from "../helpers/beerCalc";
import { HOPS } from "../helpers/recipeStandards";

import Table from "../components/base/Table";
import Input from "../components/base/Input";
import FermentablesList from "../components/recipe/FermentablesList";
import HopsList from "../components/recipe/HopsList";
import YeastInfo from "../components/recipe/YeastInfo";

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
            fermentables,
            hops,
            yeasts,
            mobile } = this.props;

        const expectedOG = calcExpectedOg(recipeFermentables, recipe);
        const expectedIBU = calcExpectedIBU(recipeHops, recipe, expectedOG);

        const bodyRow = [[
            (<Input name="batchSize"
                    attr={{type: "number"}}
                    value={recipe.batchSize}
                    validate={this.recipeValidateOne}
                    onUpdate={update}/>),
            (<Input name="boilTime"
                    attr={{type: "number"}}
                    value={recipe.boilTime}
                    validate={this.recipeValidateOne}
                    onUpdate={update}/>),
            (<Input attr={{type: "number", disabled: true}}
                    fixedDecimals={3}
                    name="expextedOG"
                    value={expectedOG} />),
            (<Input attr={{type: "number", disabled: true}}
                    name="expectedIBU"
                    value={expectedIBU} />)
        ]];

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

                        <Table
                            headerRow={["Batch size (l)", "Boil time (min)", "OG", "IBU"]}
                            bodyRows={bodyRow} mobile={mobile}/>
                    </div>

                    <div className="content-box full-width-mobile col-1-4">
                        <h2>Beer style</h2>
                    </div>

                </div>

                <div className="col-height-wrapper">

                    <div className="content-box full-width-mobile col-3-4">
                        <FermentablesList
                            mobile={mobile}
                            fermentables={fermentables}
                            recipeFermentables={recipeFermentables}
                            fermentableWeight={calcIngredientWeight(recipeFermentables)}
                            recipeId={this.props.recipe._id}/>
                    </div>

                    <div className="content-box full-width-mobile col-1-4">
                        <YeastInfo
                            mobile={mobile}
                            recipeYeast={recipeYeast}
                            yeasts={yeasts}
                            recipeId={this.props.recipe._id} />
                    </div>
                </div>
                <div className="col-height-wrapper">
                    <div className="content-box full-width-mobile col-3-4">
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
            </div>
        );
    }
}

Recipe.defaultProps = {
    recipe: {},
    recipeFermentables: [],
    recipeHops: [],
    fermentables: [],
    hops: [],
    yeasts: []
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
    const { id } = params;
    const allFermentables = RecipeFermentables.find().fetch();
    const allHops = RecipeHops.find().fetch();
    const allYeasts = RecipeYeasts.find().fetch();

    //Prepend the product ID to yeast name
    let yeasts = Yeasts.find().fetch().map((yeast) => {
        const {name, productId} = yeast;
        yeast.name = productId ? `${productId} ${name}` : name;
        return yeast;
    });

    console.log(allYeasts);

    return {
        recipe: Recipes.findOne(params.id),
        recipeFermentables: getIngredientsForRecipe(allFermentables, id),
        recipeHops: getIngredientsForRecipe(allHops, id),
        recipeYeast: getIngredientsForRecipe(allYeasts, id)[0],
        fermentables: joinArrayUniqByName(allFermentables, Fermentables.find().fetch()),
        hops: joinArrayUniqByName(allHops, Hops.find().fetch()),
        yeasts: joinArrayUniqByName(allYeasts, yeasts)
    };
}, Recipe);

//Map the current state to the properties in component
function mappingStateToProps({ flashMessages, browser }) {
    return {
        save: flashMessages.save,
        error: flashMessages.error,
        mobile: browser.mobile
    };
}

export default connect(mappingStateToProps)(RecipeContainer);