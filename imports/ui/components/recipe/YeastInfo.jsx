/**
 * @description Yeast component to present information about recipes yeast
 * @author simonpalmqvist
 */

import React from "react";

import {
    addRecipeYeast,
    updateRecipeYeast,
    deleteRecipeYeast,
    getYeastDefaults } from "../../actions/RecipeActions";

import { yeastFormToText, yeastTypeToText } from "../../helpers/beerCalc";
import { YEAST } from "../../helpers/recipeStandards";
import { RecipeYeasts } from "../../../api/recipes/yeasts/RecipeYeasts";

import AutoComplete from "../autocomplete/AutoComplete";
import Input from "../base/Input";
import Select from "../base/Select";
import Table from "../base/Table";

export default class YeastInfo extends React.Component {

    validateOne(key, value) {
        let obj = {};
        obj[key] = value;
        return RecipeYeasts.schema.newContext().validateOne(obj, key);
    }

    autoUpdateYeast(yeast) {
        const {_id} = this.props.recipeYeast;

        //Get default values from the new yeast
        let updates = getYeastDefaults(yeast);

        //Update them
        updateRecipeYeast(_id, updates);
    }

    update(update) {
        const { _id } = this.props.recipeYeast;

        updateRecipeYeast(_id, update);
    }

    add(result) {
        addRecipeYeast(this.props.recipeId, result);
    }


    render() {
        const {mobile, yeasts, recipeYeast} = this.props;

        const updateFun = this.update.bind(this);

        //Show button to add yeast if recipe has no yeast
        let content = (
            <AutoComplete
                className="add-yeast"
                ref="autocomplete"
                data={yeasts}
                placeholder="Add"
                onSelected={this.add.bind(this)} />
        );

        //If recipe has a yeast override button with yeast information
        if (recipeYeast) {
            content = (
                <div className="yeast-info">
                    <AutoComplete
                        label="Name"
                        data={yeasts}
                        onSelected={this.autoUpdateYeast.bind(this)}
                        value={recipeYeast.name}/>
                    <Select
                        name="form"
                        label="Form"
                        value={recipeYeast.form}
                        options={YEAST.FORM}
                        valToText={yeastFormToText}
                        onUpdate={updateFun} />
                    <Select
                        name="type"
                        label="Type"
                        value={recipeYeast.type}
                        options={YEAST.TYPE}
                        valToText={yeastTypeToText}
                        onUpdate={updateFun} />
                    <Input attr={{type: "number", step: "0.1"}}
                           fixedDecimals={2}
                           label="Attenuation (%)"
                           name="attenuation"
                           validate={this.validateOne}
                           value={recipeYeast.attenuation}
                           onUpdate={updateFun} />
                </div>
            );
        }

        return (
            <div>
                <h2>Yeast</h2>
                {content}
            </div>
        );
    }
}