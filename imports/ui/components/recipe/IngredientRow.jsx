/**
 * @description Fermentable row component to contain information for each fermentable
 * @author simonpalmqvist
 */

//Modules
import React from "react";

//Actions
import { updateRecipeIngredient, deleteRecipeIngredient } from "../../actions/RecipeActions";

//Helpers
import { ingredientAddedToText,ingredientTimeTypeToText } from "../../helpers/beerCalc";
import { INGREDIENT } from "../../helpers/recipeStandards";

//Components
import AutoComplete from "../autocomplete/AutoComplete";
import Input from "./../base/Input";
import Select from "./../base/Select";
import ConfirmButton from "./../base/ConfirmButton";

export default class IngredientRow extends React.Component {
    constructor(props) {
        super(props);

        this.updateIngredient = this.updateIngredient.bind(this);
        this.deleteIngredient = this.deleteIngredient.bind(this);
    }

    updateIngredient(value) {
        const { _id } = this.props.ingredient;
        updateRecipeIngredient(_id, value);
    }

    deleteIngredient() {
        const { _id } = this.props.ingredient;
        deleteRecipeIngredient(_id);
    }

    render() {
        const {ingredient, ingredients, validate, headers} = this.props;

        return (
            <tr>
                <td>
                    <AutoComplete data={ingredients}
                                  label={headers[0]}
                                  onSelected={({name}) =>  this.updateIngredient({name})}
                                  value={ingredient.name}/>
                </td>
                <td>
                    <Input attr={{type: "number", step: "0.1"}}
                           fixedDecimals={3}
                           name="amount"
                           label={headers[1]}
                           validate={validate}
                           value={ingredient.amount}
                           onUpdate={this.updateIngredient}/>
                </td>
                <td>
                    <Select name="added"
                            label={headers[2]}
                            value={ingredient.added}
                            options={INGREDIENT.ADDED}
                            valToText={ingredientAddedToText}
                            onUpdate={this.updateIngredient} />
                </td>
                <td>
                    <Input attr={{type: "number", step: "5"}}
                           name="time"
                           label={headers[3]}
                           value={ingredient.time}
                           validate={validate}
                           onUpdate={this.updateIngredient} />
                </td>
                <td>
                    <Select name="timeType"
                            label={headers[4]}
                            value={ingredient.timeType}
                            options={INGREDIENT.TIMETYPE}
                            valToText={ingredientTimeTypeToText}
                            onUpdate={this.updateIngredient} />
                </td>
                <td>
                    <ConfirmButton text="Delete" symbol="×" className="delete" action={this.deleteIngredient}/>
                </td>
            </tr>
        );
    }
}