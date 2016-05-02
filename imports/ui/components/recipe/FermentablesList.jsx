/**
 * @description Fermentables component to contain all fermentables
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
import AutoComplete from "../autocomplete/AutoComplete";
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

        const headerRow = [
            "Name",
            "EBC",
            "Potential",
            "Amount (kg)",
            "Amount (%)",
            ""
        ].map((title, i) => (<th key={i}>{title}</th>));

        const bodyRows = recipeFermentables
            .map((fermentable) => (
                <FermentableRow key={fermentable._id}
                                fermentable={fermentable}
                                fermentables={fermentables}
                                fermentableWeight={fermentableWeight}
                                validate={(key, value) => validateValue(RecipeFermentables, key, value)}/>
            ));

        return (
            <div>
                <h2>Fermentables</h2>
                <table className="responsive-table">
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