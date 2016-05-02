/**
 * @description Fermentables component to contain all fermentables
 * @author simonpalmqvist
 */

import React from "react";

import {
    updateRecipeFermentable,
    deleteRecipeFermentable
} from "../../actions/RecipeActions";

import { srmToEbc } from "../../helpers/beerCalc";

import AutoComplete from "../autocomplete/AutoComplete";
import Input from "./../base/Input";
import ConfirmButton from "./../base/ConfirmButton";

export default class FermentableRow extends React.Component {
    constructor(props) {
        super(props);

        this.updateFermentable = this.updateFermentable.bind(this);
        this.deleteFermentable = this.deleteFermentable.bind(this);
    }

    autoUpdateFermentable(fermentable) {
        let updates = {
            name: fermentable.name,
            potential: fermentable.potential || 1,
            ebc: srmToEbc(fermentable.srmPrecise || 0)
        };

        updateFermentable(updates);
    }

    updateFermentable(value) {
        const { _id } = this.props.fermentable;
        updateRecipeFermentable(_id, value);
    }

    deleteFermentable() {
        const { _id } = this.props.fermentable;
        deleteRecipeFermentable(_id);
    }

    render() {
        const {fermentableWeight, fermentable, fermentables, validate} = this.props;

        return (
            <tr>
                <td>
                    <AutoComplete data={fermentables}
                                  label="Name"
                                  onSelected={this.autoUpdateFermentable.bind(this)}
                                  value={fermentable.name}/>
                </td>
                <td>
                    <Input attr={{type: "number"}}
                           name="ebc"
                           label="EBC"
                           value={fermentable.ebc}
                           onValidate={validate}
                           onUpdate={this.updateFermentable}/>
                </td>
                <td>
                    <Input attr={{type: "number", step: "0.001"}}
                           fixedDecimals={3}
                           name="potential"
                           label="Potential"
                           value={fermentable.potential}
                           validate={validate}
                           onUpdate={this.updateFermentable}/>
                </td>
                <td>
                    <Input attr={{type: "number", step: "0.1"}}
                           fixedDecimals={3}
                           name="amount"
                           label="Amount (kg)"
                           validate={validate}
                           value={fermentable.amount}
                           onUpdate={this.updateFermentable}/>
                </td>
                <td>
                    <Input attr={{type: "number", disabled: true}}
                           fixedDecimals={2}
                           name="totalFermentables"
                           label="Amount (%)"
                           value={(fermentable.amount / fermentableWeight) * 100 || 0} />
                </td>
                <td>
                    <ConfirmButton text="Delete" symbol="×" className="delete" action={this.deleteFermentable}/>
                </td>
            </tr>
        );
    }
}