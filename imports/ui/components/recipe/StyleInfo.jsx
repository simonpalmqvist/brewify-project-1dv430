/**
 * @description Yeast component to present information about recipes yeast
 * @author simonpalmqvist
 */

//Modules
import React from "react";

//Actions
import { updateRecipeStyle } from "../../actions/RecipeActions";

import { srmToEbc } from "../../helpers/beerCalc";

//Components
import AutoComplete from "../base/AutoComplete";
import Input from "../base/Input";
import Select from "../base/Select";

export default class StyleInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    update(update) {
        const { recipeId } = this.props;

        updateRecipeStyle(recipeId, update._id);
    }

    formatNumber(string, decimals) {
        if (!string) {
            return "";
        }

        return Number(string).toFixed(decimals).toString().replace(".", ",");
    }

    render() {
        const {styles, recipeStyle} = this.props;

        //Show button to add yeast if recipe has no yeast
        let content = (
            <AutoComplete
                className="add-yeast add-button center"
                ref="autocomplete"
                data={styles}
                placeholder="Add"
                onSelected={this.update.bind(this)} />
        );

        //If recipe has a yeast override button with yeast information
        if (recipeStyle) {
            const { ibuMin, ibuMax, abvMin, abvMax, srmMin, srmMax, ogMin, ogMax, fgMin, fgMax } = recipeStyle;

            content = (
                <div className="responsive-info side style-info">
                    <AutoComplete
                        label="Name"
                        data={styles}
                        onSelected={this.update.bind(this)}
                        value={recipeStyle.name}/>
                    <Input attr={{type: "text", disabled: true}}
                           label="OG"
                           name="og"
                           value={`${this.formatNumber(ogMin, 3)}–${this.formatNumber(ogMax, 3)}`} />
                    <Input attr={{type: "text", disabled: true}}
                           label="FG"
                           name="fg"
                           value={`${this.formatNumber(fgMin, 3)}–${this.formatNumber(fgMax, 3)}`} />
                    <Input attr={{type: "text", disabled: true}}
                           label="ABV (%)"
                           name="abv"
                           value={`${this.formatNumber(abvMin, 1)}–${this.formatNumber(abvMax, 1)}`} />
                    <Input attr={{type: "text", disabled: true}}
                           label="IBU"
                           name="ibu"
                           value={`${ibuMin}–${ibuMax}`} />
                    <Input attr={{type: "text", disabled: true}}
                           label="EBC"
                           name="ebc"
                           value={`${srmToEbc(srmMin)}–${srmToEbc(srmMax)}`} />
                </div>
            );
        }

        return (
            <div>
                <h2 className="symbol beer">Style</h2>
                {content}
            </div>
        );
    }
}