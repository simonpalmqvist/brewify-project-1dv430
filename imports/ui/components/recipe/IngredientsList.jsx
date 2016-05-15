/**
 * @description Other ingredients component to contain all ingredients for recipe
 * @author simonpalmqvist
 */

//Modules
import React from "react";

//Actions
import {
    addRecipeIngredient,
    validateValue
} from "../../actions/RecipeActions";

//Collections
import { RecipeIngredients } from "../../../api/recipes/ingredients/RecipeIngredients";

//Components
import IngredientRow from "./IngredientRow";
import AutoComplete from "../base/AutoComplete";

export default class IngredientsList extends React.Component {
    constructor(props) {
        super(props);
    }

    add(result) {
        addRecipeIngredient(this.props.recipeId, result);
    }

    render() {
        const {ingredients, recipeIngredients} = this.props;

        const headers = [
            "Name",
            "Amount (kg)",
            "Added during",
            "Added at",
            "Unit",
            ""
        ];

        const headerRow = headers.map((title, i) => (<th key={i}>{title}</th>));

        const bodyRows = recipeIngredients
            .map((ingredient) => (
                <IngredientRow key={ingredient._id}
                                headers={headers}
                                ingredient={ingredient}
                                ingredients={ingredients}
                                validate={(key, value) => validateValue(RecipeIngredients, key, value)}/>
            ));

        return (
            <div>
                <h2>Other ingredients</h2>
                <table className="recipe-ingredients responsive-table">
                    <thead>
                    <tr>
                        {headerRow}
                    </tr>
                    </thead>
                    <tbody>
                        {bodyRows}
                    </tbody>
                </table>
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