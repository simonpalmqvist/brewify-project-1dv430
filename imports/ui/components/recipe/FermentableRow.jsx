/**
 * @description Fermentables component to contain all fermentables
 * @author simonpalmqvist
 */

import React from "react";

import { updateRecipeFermentable } from "../../actions/RecipeActions";
import { errorAction } from "../../actions/statusActions";

import { srmToEbc } from "../../helpers/beerCalc";
import { YIELD, SRM} from "../../helpers/recipeStandards";

import { Fermentables } from "../../../api/brewerydb/Fermentables";
import { RecipeFermentables } from "../../../api/recipes/fermentables/RecipeFermentables";

import AutoComplete from "../autocomplete/AutoComplete";
import Input from "./Input";

export default class FermentableRow extends React.Component {
    constructor(props) {
        super(props);

    }

    validateOne(key, value) {
        let obj = {};
        obj[key] = value;
        return RecipeFermentables.schema.newContext().validateOne(obj, key);
    }

    update(value) {
        updateRecipeFermentable(this.props.fermentable._id, value);
    }

    autoUpdate(error, fermentable) {
        if (error) {
            return errorAction(error);
        }

        let updates = {
            name: fermentable.name,
            extractYield: fermentable.dryYield || YIELD,
            ebc: srmToEbc(fermentable.srmPrecise || SRM)
        };

        this.update(updates);
    }

    render() {
        const updateFun = this.update.bind(this);

        const {fermentable, totalFermentables} = this.props;

        return (
            <tr key={fermentable._id}>
                <td>
                    <AutoComplete
                        data={Fermentables.find({potential: {$exists: true}}).fetch()}
                        onSelected={this.autoUpdate.bind(this)}
                        value={fermentable.name}/>
                </td>
                <td>
                    <Input attr={{type: "number", step: "0.01"}} fixedDecimals={3}
                           name="amount" validate={this.validateOne}
                           value={fermentable.amount} onUpdate={updateFun}/>
                </td>
                <td>
                    <Input attr={{type: "number"}}
                           name="ebc" value={fermentable.ebc}
                           validate={this.validateOne} onUpdate={updateFun}/>
                </td>
                <td>
                    <Input attr={{type: "number"}} fixedDecimals={2}
                           name="extractYield" value={fermentable.extractYield}
                           validate={this.validateOne} onUpdate={updateFun}/>
                </td>
                <td>
                    <Input attr={{type: "number", disabled: true}} fixedDecimals={2}
                           name="totalFermentables" value={(fermentable.amount / totalFermentables) * 100} />
                </td>
            </tr>
        );
    }
}