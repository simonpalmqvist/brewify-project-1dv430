/**
 * @description Yeast component to present information about recipes yeast
 * @author simonpalmqvist
 */

//Modules
import React from "react";

//Actions
import { updateRecipeStyle, deleteRecipeStyle } from "../../actions/RecipeActions";

//Components
import AutoComplete from "../base/AutoComplete";
import Input from "../base/Input";
import Select from "../base/Select";

export default class StyleInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    update(update) {
        const { _id } = this.props.recipeId;

        updateRecipeStyle(_id, update._id);
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
            content = (
                <div className="responsive-info side style-info">
                    <AutoComplete
                        label="Name"
                        data={styles}
                        onSelected={this.update.bind(this)}
                        value={recipeStyle.name}/>
                    <Input attr={{type: "number", step: "0.1"}}
                           fixedDecimals={2}
                           label="IBU min"
                           name="minIbu"
                           value={recipeStyle.minIbu} />
                </div>
            );
        }

        return (
            <div>
                <h2>Beer Style</h2>
                {content}
            </div>
        );
    }
}