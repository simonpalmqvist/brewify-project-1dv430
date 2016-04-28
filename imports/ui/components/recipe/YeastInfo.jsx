/**
 * @description Yeast component to present information about recipes yeast
 * @author simonpalmqvist
 */

import React from "react";

import { addRecipeYeast, updateRecipeYeast, deleteRecipeYeast } from "../../actions/RecipeActions";

import { srmToEbc } from "../../helpers/beerCalc";

import { RecipeYeasts } from "../../../api/recipes/yeasts/RecipeYeasts";

import AutoComplete from "../autocomplete/AutoComplete";
import Input from "./../base/Input";
import ConfirmButton from "./../base/ConfirmButton";
import Table from "../base/Table";

export default class YeastInfo extends React.Component {

    validateOne(key, value) {
        let obj = {};
        obj[key] = value;
        return RecipeYeasts.schema.newContext().validateOne(obj, key);
    }

    autoUpdateRecipe(fermentable, id) {
        console.log("Yay");
        /*let updates = {
            name: fermentable.name,
            potential: fermentable.potential || 1,
            ebc: srmToEbc(fermentable.srmPrecise || 0)
        };

        updateRecipeFermentable(id, updates);*/
    }

    add(result) {
        addRecipeYeast(this.props.recipeId, result);
    }


    render() {
        const {mobile, yeasts, recipeYeast} = this.props;

        let content = (
            <AutoComplete
                className="add-yeast"
                ref="autocomplete"
                data={yeasts}
                placeholder="Add"
                onSelected={this.add.bind(this)} />
        );

        if (recipeYeast) {
            content = (
                <p>{recipeYeast.name}</p>
            );
        }

        return (
            <div>
                <h2 className="extract-header">Yeast</h2>
                {content}
            </div>
        );
    }
}