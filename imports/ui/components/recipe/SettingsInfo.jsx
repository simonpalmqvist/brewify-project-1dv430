/**
 * @description Recipe settings component to present information about recipes settings
 * @author simonpalmqvist
 */

//Modules
import React from "react";

//Actions
import { updateRecipe } from "../../actions/RecipeActions";

//Collections
import { Recipes } from "../../../api/recipes/Recipes";

//Components
import Input from "../base/Input";


export default class SettingsInfo extends React.Component {

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

        const { recipe } = this.props;

        return (
            <div>
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
        );
    }
}