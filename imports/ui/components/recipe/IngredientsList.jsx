/**
 * @description Other ingredients component to contain all ingredients for recipe
 * @author simonpalmqvist
 */

import React from "react";

import { addRecipeIngredient, updateRecipeIngredient, deleteRecipeIngredient } from "../../actions/RecipeActions";

import { ingredientAddedToText, ingredientTimeTypeToText } from "../../helpers/beerCalc";
import { INGREDIENT } from "../../helpers/recipeStandards";

import { RecipeIngredients } from "../../../api/recipes/ingredients/RecipeIngredients";

import AutoComplete from "../autocomplete/AutoComplete";
import Input from "./../base/Input";
import ConfirmButton from "./../base/ConfirmButton";
import Table from "../base/Table";
import Select from "../base/Select";

export default class IngredientsList extends React.Component {
    constructor(props) {
        super(props);
    }

    validateOne(key, value) {
        let obj = {};
        obj[key] = value;
        return RecipeIngredients.schema.newContext().validateOne(obj, key);
    }

    add(result) {
        addRecipeIngredient(this.props.recipeId, result);
    }

    render() {
        const {mobile, ingredients, recipeIngredients} = this.props;

        const headerRow = [
            "Name",
            "Amount (kg)",
            "Added",
            "Time added",
            "Time",
            ""
        ];

        const bodyRows = recipeIngredients.map((ingredient) => {
            const {_id} = ingredient;
            const updateFun = (value) => updateRecipeIngredient(_id, value);
            const autoUpdateFun = ({name}) => updateRecipeIngredient(_id, {name});
            const deleteFun = () => deleteRecipeIngredient(_id);

            return [
                (<AutoComplete
                    data={ingredients}
                    onSelected={autoUpdateFun}
                    value={ingredient.name}/>),
                (<Input attr={{type: "number", step: "0.1"}}
                        fixedDecimals={3}
                        name="amount"
                        validate={this.validateOne}
                        value={ingredient.amount}
                        onUpdate={updateFun}/>),
                (<Select name="added"
                         value={ingredient.added}
                         options={INGREDIENT.ADDED}
                         valToText={ingredientAddedToText}
                         onUpdate={updateFun} />),
                (<Input attr={{type: "number", step: "5"}}
                        name="time"
                        value={ingredient.time}
                        validate={this.validateOne}
                        onUpdate={updateFun} />),
                (<Select name="timeType"
                         value={ingredient.timeType}
                         options={INGREDIENT.TIMETYPE}
                         valToText={ingredientTimeTypeToText}
                         onUpdate={updateFun} />),
                (<ConfirmButton text="Delete" symbol="×" className="delete" action={deleteFun}/>)
            ];
        });

        return (
            <div>
                <h2>Other ingredients</h2>
                <Table
                    className="recipe-ingredients"
                    headerRow={headerRow}
                    bodyRows={bodyRows}
                    mobile={mobile}/>
                <AutoComplete
                    className="add-ingredient add-button"
                    ref="autocomplete"
                    placeholder="Add"
                    data={ingredients}
                    onSelected={this.add.bind(this)}/>
            </div>
        );
    }
}