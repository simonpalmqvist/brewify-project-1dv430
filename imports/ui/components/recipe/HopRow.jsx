/**
 * @description Hop row component to contain information for each Hop
 * @author simonpalmqvist
 */

//Modules
import React from "react";

//Actions
import {
    getHopDefaults,
    updateRecipeHop,
    deleteRecipeHop
} from "../../actions/RecipeActions";

//Helpers
import { hopFormToText } from "../../helpers/beerCalc";
import { HOPS } from "../../helpers/recipeStandards";

//Components
import AutoComplete from "../base/AutoComplete";
import Input from "../base/Input";
import Select from "../base/Select";
import ConfirmButton from "../base/ConfirmButton";

export default class HopRow extends React.Component {
    constructor(props) {
        super(props);

        this.updateHop = this.updateHop.bind(this);
        this.deleteHop = this.deleteHop.bind(this);
    }

    autoUpdateHop(hop) {
        this.updateHop(getHopDefaults(hop));
    }

    updateHop(value) {
        const { _id } = this.props.hop;
        updateRecipeHop(_id, value);
    }

    deleteHop() {
        const { _id } = this.props.hop;
        deleteRecipeHop(_id);
    }

    render() {
        const {hop, hops, validate, headers} = this.props;

        return (
            <tr>
                <td>
                    <AutoComplete data={hops}
                                  label={headers[0]}
                                  onSelected={this.autoUpdateHop.bind(this)}
                                  value={hop.name}/>
                </td>
                <td>
                    <Select name="form"
                            label={headers[1]}
                            value={hop.form}
                            options={HOPS.FORM}
                            valToText={hopFormToText}
                            onUpdate={this.updateHop} />
                </td>
                <td>
                    <Input attr={{type: "number", step: "0.1"}}
                           fixedDecimals={2}
                           name="alpha"
                           label={headers[2]}
                           validate={validate}
                           value={hop.alpha}
                           onUpdate={this.updateHop} />
                </td>
                <td>
                    <Input attr={{type: "number", step: "5"}}
                           name="amount"
                           label={headers[3]}
                           value={hop.amount}
                           validate={validate}
                           onUpdate={this.updateHop} />

                </td>
                <td>
                    <Input attr={{type: "number", step: "5"}}
                           name="time"
                           label={headers[4]}
                           value={hop.time}
                           validate={validate}
                           onUpdate={this.updateHop} />
                </td>
                <td>
                    <ConfirmButton text="Delete" symbol="×" className="delete" action={this.deleteHop}/>
                </td>
            </tr>
        );
    }
}