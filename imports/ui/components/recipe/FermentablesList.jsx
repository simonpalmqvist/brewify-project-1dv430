/**
 * @description Fermentables component to contain all fermentables
 * @author simonpalmqvist
 */

import React from "react";

import { addRecipeFermentable, updateRecipeFermentable, deleteRecipeFermentable } from "../../actions/RecipeActions";

import { srmToEbc } from "../../helpers/beerCalc";

import { RecipeFermentables } from "../../../api/recipes/fermentables/RecipeFermentables";

import AutoComplete from "../autocomplete/AutoComplete";
import Input from "./../base/Input";
import ConfirmButton from "./../base/ConfirmButton";
import Table from "../base/Table";

export default class FermentablesList extends React.Component {
    constructor(props) {
        super(props);
    }

    validateOne(key, value) {
        let obj = {};
        obj[key] = value;
        return RecipeFermentables.schema.newContext().validateOne(obj, key);
    }

    autoUpdateFermentable(fermentable, id) {
        let updates = {
            name: fermentable.name,
            potential: fermentable.potential || 1,
            ebc: srmToEbc(fermentable.srmPrecise || 0)
        };

        updateRecipeFermentable(id, updates);
    }

    add(result) {
        addRecipeFermentable(this.props.recipeId, result);
    }

    render() {
        const {mobile, fermentableWeight, fermentables, recipeFermentables} = this.props;

        const headerRow = [
            "Name",
            "EBC",
            "Potential",
            "Amount (kg)",
            "Amount (%)",
            ""
        ];

        const footerRow = [
            "", "", "",
            (<Input
                attr={{type: "number", disabled: true}}
                fixedDecimals={3}
                name="fermentableWeight"
                value={fermentableWeight} />),
            "", ""
        ];

        const bodyRows = recipeFermentables.map((fermentable) => {
            const {_id} = fermentable;
            const updateFun = (value) => updateRecipeFermentable(_id, value);
            const autoUpdateFun = (fermentable) => this.autoUpdateFermentable(fermentable, _id);
            const deleteFun = () => deleteRecipeFermentable(_id);

            return [
                (<AutoComplete
                    data={fermentables}
                    onSelected={autoUpdateFun}
                    value={fermentable.name}/>),
                (<Input attr={{type: "number"}}
                        name="ebc"
                        value={fermentable.ebc}
                        onValidate={this.validateOne}
                        onUpdate={updateFun}/>),
                (<Input attr={{type: "number", step: "0.001"}}
                        fixedDecimals={3}
                        name="potential"
                        value={fermentable.potential}
                        validate={this.validateOne}
                        onUpdate={updateFun}/>),
                (<Input attr={{type: "number", step: "0.1"}}
                        fixedDecimals={3}
                        name="amount"
                        validate={this.validateOne}
                        value={fermentable.amount}
                        onUpdate={updateFun}/>),
                (<Input attr={{type: "number", disabled: true}}
                        fixedDecimals={2}
                        name="totalFermentables"
                        value={(fermentable.amount / fermentableWeight) * 100 || 0} />),
                (<ConfirmButton text="Delete" symbol="×" className="delete" action={deleteFun}/>)
            ];
        });

        return (
            <div>
                <h2>Fermentables</h2>
                <Table
                    className="recipe-fermentables"
                    headerRow={headerRow}
                    footerRow={footerRow}
                    bodyRows={bodyRows}
                    mobile={mobile}/>
                <AutoComplete
                    className="add-fermentable"
                    ref="autocomplete"
                    placeholder="Add"
                    data={fermentables}
                    onSelected={this.add.bind(this)}/>
            </div>
        );
    }
}