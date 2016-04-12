/**
 * @description Fermentables component to contain all fermentables
 * @author simonpalmqvist
 */

import React from "react";

import { updateRecipeFermentable } from "../../actions/RecipeActions";

import { Fermentables } from "../../../api/brewerydb/Fermentables";

import AutoComplete from "../autocomplete/AutoComplete";

export default class FermentableRow extends React.Component {
    constructor(props) {
        super(props);

    }

    update(value) {
        updateRecipeFermentable(this.props.fermentable._id, value);
    }

    autoUpdate(error, fermentable) {
        console.log(fermentable);
    }

    render() {
        const {fermentable, totalFermentables} = this.props;

        return (
            <tr key={fermentable._id}>
                <td><AutoComplete
                    data={Fermentables.find({potential: {$exists: true}}).fetch()}
                    onSelected={this.autoUpdate.bind(this)}
                    value={fermentable.name}/>
                </td>
                <td>{fermentable.amount}</td>
                <td>{fermentable.ebc}</td>
                <td>{fermentable.extractYield}</td>
                <td>{fermentable.amount / totalFermentables}</td>
            </tr>
        );
    }
}