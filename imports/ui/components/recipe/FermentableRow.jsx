/**
 * @description Fermentable row component to contain information for each fermentable
 * @author simonpalmqvist
 */

//Modules
import React from "react";

//Actions
import {
    getFermentableDefaults,
    updateRecipeFermentable,
    deleteRecipeFermentable
} from "../../actions/RecipeActions";

//Components
import AutoComplete from "../base/AutoComplete";
import Input from "./../base/Input";
import ConfirmButton from "./../base/ConfirmButton";

export default class FermentableRow extends React.Component {
    constructor(props) {
        super(props);

        this.updateFermentable = this.updateFermentable.bind(this);
        this.deleteFermentable = this.deleteFermentable.bind(this);
    }

    autoUpdateFermentable(fermentable) {
        this.updateFermentable(getFermentableDefaults(fermentable));
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
        const {fermentableWeight, fermentable, fermentables, validate, headers} = this.props;

        return (
            <tr>
                <td>
                    <AutoComplete data={fermentables}
                                  label={headers[0]}
                                  onSelected={this.autoUpdateFermentable.bind(this)}
                                  value={fermentable.name}/>
                </td>
                <td>
                    <Input attr={{type: "number"}}
                           name="ebc"
                           label={headers[1]}
                           value={fermentable.ebc}
                           warning={{value: 0, title: "Please set EBC value for grain"}}
                           validate={validate}
                           onUpdate={this.updateFermentable}/>
                </td>
                <td>
                    <Input attr={{type: "number", step: "0.001"}}
                           fixedDecimals={3}
                           name="potential"
                           label={headers[2]}
                           value={fermentable.potential}
                           warning={{value: 1.000, title: "Please set potential for grain"}}
                           validate={validate}
                           onUpdate={this.updateFermentable}/>
                </td>
                <td>
                    <Input attr={{type: "number", step: "0.1"}}
                           fixedDecimals={3}
                           name="amount"
                           label={headers[3]}
                           warning={{value: 0, title: "Please add grain amount"}}
                           validate={validate}
                           value={fermentable.amount}
                           onUpdate={this.updateFermentable}/>
                </td>
                <td>
                    <Input attr={{type: "number", disabled: true}}
                           fixedDecimals={2}
                           name="totalFermentables"
                           label={headers[4]}
                           value={(fermentable.amount / fermentableWeight) * 100 || 0} />
                </td>
                <td>
                    <ConfirmButton text="Delete" symbol="×" className="delete" action={this.deleteFermentable}/>
                </td>
            </tr>
        );
    }
}