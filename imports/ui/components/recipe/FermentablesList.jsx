/**
 * @description Fermentables component to contain all recipes fermentables
 * @author simonpalmqvist
 */

//Modules
import React from "react";

//Actions
import {
    addRecipeFermentable,
    validateValue
} from "../../actions/RecipeActions";

//Collections
import { RecipeFermentables } from "../../../api/recipes/fermentables/RecipeFermentables";

//Components
import FermentableRow from "./FermentableRow";
import AutoComplete from "../base/AutoComplete";
import Input from "./../base/Input";

export default class FermentablesList extends React.Component {
    constructor(props) {
        super(props);
    }

    add(result) {
        addRecipeFermentable(this.props.recipeId, result);
    }

    render() {
        const {fermentableWeight, fermentables, recipeFermentables} = this.props;

        const headers = [
            "Name",
            "EBC",
            "Potential",
            "Amount (kg)",
            "Amount (%)",
            ""
        ];

        const headerRow = headers.map((title, i) => (<th key={i}>{title}</th>));

        const bodyRows = recipeFermentables
            .map((fermentable) => (
                <FermentableRow key={fermentable._id}
                                headers={headers}
                                fermentable={fermentable}
                                fermentables={fermentables}
                                fermentableWeight={fermentableWeight}
                                validate={(key, value) => validateValue(RecipeFermentables, key, value)}/>
            ));

        return (
            <div>
                <h2 className="symbol grain">Grains &amp; Extracts</h2>
                <table className="recipe-fermentables responsive-table">
                    <thead>
                        <tr>
                            {headerRow}
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <Input
                                    attr={{type: "number", disabled: true}}
                                    fixedDecimals={3}
                                    name="fermentableWeight"
                                    label="Total amount"
                                    value={fermentableWeight} />
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tfoot>
                    <tbody>
                        {bodyRows}
                    </tbody>
                </table>
                <AutoComplete
                    className="add-fermentable add-button"
                    ref="autocomplete"
                    placeholder="Add"
                    data={fermentables}
                    onSelected={this.add.bind(this)}/>
            </div>
        );
    }
}