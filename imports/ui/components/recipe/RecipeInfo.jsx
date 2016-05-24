/**
 * @description Recipe info component to present information about recipe calculations and name
 * @author simonpalmqvist
 */

//Modules
import React from "react";

//Actions
import { updateRecipe } from "../../actions/RecipeActions";

//Helpers
import {
    calcExpectedOg,
    calcExpectedFg,
    calcExpectedABV,
    calcExpectedIBU,
    calcBeerEbc,
    calcBitternessRatio,
    wortAfterBoil
} from "../../helpers/beerCalc";


//Collections
import { Recipes } from "../../../api/recipes/Recipes";

//Components
import Input from "../base/Input";
import EbcInput from "./EbcInput";

export default class RecipeInfo extends React.Component {

    componentDidMount() {
        const input = this.refs.recipeName.refs.input;

        //If recipe has default name then auto focus on it so it can be changed directly
        if (this.props.recipe.name === "Recipe") {
            input.focus();
            input.value = "";
        }
    }

    update(value) {
        updateRecipe(this.props.recipe._id, value);
    }

    recipeValidateOne(key, value) {
        //Add empty object with key and value to validate.
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
            recipeYeast
            } = this.props;

        //Calculate all expected values for recipe
        const attenuation       = recipeYeast ? recipeYeast.attenuation : 0;
        const expectedOG        = calcExpectedOg(recipeFermentables, recipe);
        const expectedFG        = calcExpectedFg(attenuation, expectedOG);
        const expectedABV       = calcExpectedABV(expectedOG, expectedFG);
        const expectedIBU       = calcExpectedIBU(recipeHops, recipe, expectedOG);
        const bitternessRatio   = calcBitternessRatio(expectedOG, expectedIBU) || 0;
        const expectedEBC       = calcBeerEbc(recipeFermentables, recipe);

        return (
            <div>
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
                    <Input attr={{type: "number", disabled: true}}
                           name="wortAfterBoil"
                           label="Wort after boil (l)"
                           value={wortAfterBoil(recipe)} />
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
        );
    }
}