/**
 * @description Fermentables component to contain all fermentables
 * @author simonpalmqvist
 */

//Modules
import React from "react";

//Actions
import { addRecipeHop, validateValue } from "../../actions/RecipeActions";

//Collections
import { RecipeHops } from "../../../api/recipes/hops/RecipeHops";

//Components
import HopRow from "./HopRow";
import AutoComplete from "../base/AutoComplete";
import Input from "../base/Input";

export default class HopsList extends React.Component {

    add(result) {
        const { recipeId, use } = this.props;
        addRecipeHop(recipeId, use, result);
    }

    render() {
        const {hopWeight, hops, recipeHops} = this.props;

        const headers= [
            "Name",
            "Form",
            "Alpha-acid",
            "Amount (g)",
            "Boil time",
            ""
        ];

        const headerRow = headers.map((title, i) => (<th key={i}>{title}</th>));

        const bodyRows = recipeHops
            .sort((a, b) => b.time - a.time)
            .map((hop) => (
                <HopRow key={hop._id}
                        headers={headers}
                        hop={hop}
                        hops={hops}
                        validate={(key, value) => validateValue(RecipeHops, key, value)}/>
            ));

        return (
            <div>
                <h2>Hops</h2>
                <table className="recipe-hops responsive-table">
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
                                name="hopWeight"
                                label="Total amount"
                                value={hopWeight} />
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
                    className="add-hop add-button"
                    ref="autocomplete"
                    placeholder="Add"
                    data={hops}
                    onSelected={this.add.bind(this)} />
            </div>
        );
    }
}