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
import { Styles } from "../../api/brewerydb/Styles";

import {
    calcExpectedOg,
    calcExpectedFg,
    calcExpectedABV,
    calcExpectedIBU,
    calcBeerEbc,
    calcIngredientWeight,
    calcBitternessRatio
} from "../helpers/beerCalc";

import { HOPS } from "../helpers/recipeStandards";

import Input from "../components/base/Input";
import FermentablesList from "../components/recipe/FermentablesList";
import HopsList from "../components/recipe/HopsList";
import YeastInfo from "../components/recipe/YeastInfo";
import IngredientsList from "../components/recipe/IngredientsList";
import StyleInfo from "../components/recipe/StyleInfo";
import EbcInput from "../components/recipe/EbcInput";

class Recipe extends React.Component {

    componentDidMount() {
        const input = this.refs.recipeName.refs.input;

        //If recipe has default name then auto focus on it
        if (this.props.recipe.name === "Recipe") {
            console.log(input);
            input.focus();
            input.value = "";
        }
    }

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
            recipeStyle,
            fermentables,
            hops,
            yeasts,
            ingredients,
            styles } = this.props;

        const attenuation       = recipeYeast ? recipeYeast.attenuation : 0;
        const expectedOG        = calcExpectedOg(recipeFermentables, recipe);
        const expectedFG        = calcExpectedFg(attenuation, expectedOG);
        const expectedABV       = calcExpectedABV(expectedOG, expectedFG);
        const expectedIBU       = calcExpectedIBU(recipeHops, recipe, expectedOG);
        const bitternessRatio   = calcBitternessRatio(expectedOG, expectedIBU) || 0;
        const expectedEBC       = calcBeerEbc(recipeFermentables, recipe);

        return (
            <div>
                <div className="col-wrapper">
                    <div className="col col-1-1">
                        <div className="content-box full-width-mobile main-settings">
                            <Input name="name"
                                   value={recipe.name}
                                   ref="recipeName"
                                   className="input-header"
                                   attr={{type: "text", placeholder: "Select a name"}}
                                   validate={this.recipeValidateOne}
                                   onUpdate={update}/>

                            <div className="responsive-info recipe-info">
                                <Input attr={{type: "number", disabled: true}}
                                       fixedDecimals={3}
                                       name="expectedOG"
                                       label="OG"
                                       value={expectedOG} />
                                <Input attr={{type: "number", disabled: true}}
                                       fixedDecimals={3}
                                       name="expectedFG"
                                       label="FG"
                                       value={expectedFG} />
                                <Input attr={{type: "number", disabled: true}}
                                       fixedDecimals={1}
                                       name="expectedABV"
                                       label="ABV (%)"
                                       value={expectedABV} />
                                <Input attr={{type: "number", disabled: true}}
                                       name="expectedIBU"
                                       label="IBU"
                                       value={expectedIBU} />
                                <Input attr={{type: "number", disabled: true}}
                                       fixedDecimals={2}
                                       name="bitternessRatio"
                                       label="BU/GU"
                                       value={bitternessRatio} />
                                <EbcInput ebc={expectedEBC} />
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
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-wrapper">
                    <div className="col col-3-4 break-laptop">
                        <div className="content-box extract full-width-mobile">
                            <FermentablesList
                                fermentables={fermentables}
                                recipeFermentables={recipeFermentables}
                                fermentableWeight={calcIngredientWeight(recipeFermentables)}
                                recipeId={this.props.recipe._id}/>
                        </div>
                        <div className="content-box hops full-width-mobile">
                            <HopsList
                                hops={hops}
                                recipeHops={recipeHops}
                                use={HOPS.USE.BOIL}
                                hopWeight={calcIngredientWeight(recipeHops)}
                                recipeId={this.props.recipe._id}/>
                        </div>
                        <div className="content-box other-ingredients full-width-mobile">
                            <IngredientsList
                                ingredients={ingredients}
                                recipeIngredients={recipeIngredients}
                                recipeId={this.props.recipe._id}/>
                        </div>
                    </div>
                    <div className="col col-1-4 break-laptop">
                        <div className="content-box yeast full-width-mobile">
                            <YeastInfo
                                recipeYeast={recipeYeast}
                                yeasts={yeasts}
                                recipeId={this.props.recipe._id} />
                        </div>
                        <div className="content-box style full-width-mobile">
                            <StyleInfo
                                recipeStyle={recipeStyle}
                                styles={styles}
                                recipeId={this.props.recipe._id} />
                        </div>
                        <div className="content-box full-width-mobile">
                            <h2 className="symbol settings">Settings</h2>
                            <div className="responsive-info side settings-info">
                                <Input name="efficiency"
                                       label="Mash efficiency (%)"
                                       attr={{type: "number"}}
                                       fixedDecimals={2}
                                       value={recipe.efficiency}
                                       validate={this.recipeValidateOne}
                                       onUpdate={update}/>
                                <Input name="boilLoss"
                                       label="Loss in brew-kettle (l)"
                                       attr={{type: "number"}}
                                       value={recipe.boilLoss}
                                       validate={this.recipeValidateOne}
                                       onUpdate={update}/>
                                <Input name="fermenterLoss"
                                       label="Loss in fermenter (l)"

                                       attr={{type: "number"}}
                                       value={recipe.fermenterLoss}
                                       validate={this.recipeValidateOne}
                                       onUpdate={update}/>
                            </div>
                        </div>
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
    const recipe          = Recipes.findOne(id);
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
        recipe:             recipe,
        recipeFermentables: getIngredientsForRecipe(allFermentables, id),
        recipeHops:         getIngredientsForRecipe(allHops, id),
        recipeYeast:        getIngredientsForRecipe(allYeasts, id)[0],
        recipeIngredients:  getIngredientsForRecipe(allIngredients, id),
        recipeStyle:        Styles.findOne({_id: recipe.styleId}),
        fermentables:       joinArrayUniqByName(allFermentables, Fermentables.find().fetch()),
        hops:               joinArrayUniqByName(allHops, Hops.find().fetch()),
        yeasts:             joinArrayUniqByName(allYeasts, yeasts),
        ingredients:        joinArrayUniqByName(allIngredients, Ingredients.find().fetch()),
        styles:             Styles.find().fetch()
    };
}, Recipe);

//Map the current state to the properties in component
function mappingStateToProps({ flashMessages }) {
    return {
        save: flashMessages.save,
        error: flashMessages.error
    };
}

export default connect(mappingStateToProps)(RecipeContainer);