/**
 * @description Fermentables component to contain all fermentables
 * @author simonpalmqvist
 */

import React from "react";

import { updateRecipeFermentable, deleteRecipeFermentable } from "../../actions/RecipeActions";
import { errorAction } from "../../actions/StatusActions";

import { srmToEbc } from "../../helpers/beerCalc";

import { Fermentables } from "../../../api/brewerydb/Fermentables";
import { RecipeFermentables } from "../../../api/recipes/fermentables/RecipeFermentables";

import { styles } from "../../layouts/styles";

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
            potential: fermentable.potential || 1,
            ebc: srmToEbc(fermentable.srmPrecise || 0)
        };

        this.update(updates);
    }

    maybeDelete() {
        deleteRecipeFermentable(this.props.fermentable._id);
    }


    render() {
        const updateFun = this.update.bind(this);

        const {fermentable, totalFermentables} = this.props;

        return (
            <tr key={fermentable._id}>
                <td>
                    <AutoComplete
                        data={Fermentables.find().fetch()}
                        onSelected={this.autoUpdate.bind(this)}
                        value={fermentable.name}/>
                </td>
                <td>
                    <Input attr={{type: "number"}}
                           style={styles.input}
                           name="ebc"
                           value={fermentable.ebc}
                           validate={this.validateOne}
                           onUpdate={updateFun}/>
                </td>
                <td>
                    <Input attr={{type: "number", step: "0.001"}}
                           fixedDecimals={3}
                           style={styles.input}
                           name="potential"
                           value={fermentable.potential}
                           validate={this.validateOne}
                           onUpdate={updateFun}/>
                </td>
                <td>
                    <Input attr={{type: "number", step: "0.1"}}
                           fixedDecimals={3}
                           style={styles.input}
                           name="amount"
                           validate={this.validateOne}
                           value={fermentable.amount}
                           onUpdate={updateFun}/>
                </td>
                <td>
                    <Input attr={{type: "number", disabled: true}}
                           fixedDecimals={2}
                           style={styles.disabledInput}
                           name="totalFermentables"
                           value={(fermentable.amount / totalFermentables) * 100 || 0} />
                </td>
                <td>
                    <button onClick={this.maybeDelete.bind(this)}>Delete</button>
                </td>
            </tr>
        );
    }
}