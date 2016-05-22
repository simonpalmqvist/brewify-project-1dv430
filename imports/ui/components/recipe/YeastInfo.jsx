/**
 * @description Yeast component to present information about recipes yeast
 * @author simonpalmqvist
 */

//Modules
import React from "react";

//Actions
import {
    addRecipeYeast,
    updateRecipeYeast,
    deleteRecipeYeast,
    getYeastDefaults,
    validateValue
} from "../../actions/RecipeActions";

//Helpers
import { yeastFormToText, yeastTypeToText } from "../../helpers/beerCalc";
import { YEAST } from "../../helpers/recipeStandards";

//Collections
import { RecipeYeasts } from "../../../api/recipes/yeasts/RecipeYeasts";

//Components
import AutoComplete from "../base/AutoComplete";
import Input from "../base/Input";
import Select from "../base/Select";

export default class YeastInfo extends React.Component {
    constructor(props) {
        super(props);

        this.update = this.update.bind(this);
    }

    autoUpdateYeast(yeast) {
        //Update them
        this.update(getYeastDefaults(yeast));
    }

    update(update) {
        const { _id } = this.props.recipeYeast;

        updateRecipeYeast(_id, update);
    }

    add(result) {
        addRecipeYeast(this.props.recipeId, result);
    }

    validate(key, value) {
        return validateValue(RecipeYeasts, key, value);
    }


    render() {
        const {yeasts, recipeYeast} = this.props;

        //Show button to add yeast if recipe has no yeast
        let content = (
            <AutoComplete
                className="add-yeast add-button center"
                ref="autocomplete"
                data={yeasts}
                placeholder="Add"
                onSelected={this.add.bind(this)} />
        );

        //If recipe has a yeast override button with yeast information
        if (recipeYeast) {
            content = (
                <div className="responsive-info side yeast-info">
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
                        onUpdate={this.update} />
                    <Select
                        name="type"
                        label="Type"
                        value={recipeYeast.type}
                        options={YEAST.TYPE}
                        valToText={yeastTypeToText}
                        onUpdate={this.update} />
                    <Input attr={{type: "number", step: "0.1"}}
                           fixedDecimals={2}
                           label="Attenuation (%)"
                           name="attenuation"
                           warning={{value: 0, title: "Please add yeasts attenuation"}}
                           validate={this.validate}
                           value={recipeYeast.attenuation}
                           onUpdate={this.update} />
                </div>
            );
        }

        return (
            <div>
                <h2 className="symbol yeast">Yeast</h2>
                {content}
            </div>
        );
    }
}