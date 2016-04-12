/**
 * @description Fermentables component to contain all fermentables
 * @author simonpalmqvist
 */

import React from "react";

import { addRecipeFermentable } from "../../actions/RecipeActions";

import { Fermentables } from "../../../api/brewerydb/Fermentables";

import FermentableRow from "./FermentableRow";
import AutoComplete from "../autocomplete/AutoComplete";

export default class FermentablesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            add: false
        };
    }

    showAddInput() {
        this.setState({add: true}, () => {
            this.refs.autocomplete.refs.input.focus();
        });
    }

    add(error, result) {
        if (!error) {
            addRecipeFermentable(this.props.recipeId, result);
        }
    }

    finishedAdding() {
        this.setState({add: false});
    }

    render() {
        const {
            fermentables,
            expectedOG,
            totalFermentables} = this.props;

        let items = fermentables.map((fermentable) => (
            <FermentableRow key={fermentable._id} fermentable={fermentable} totalFermentables={totalFermentables}/>
        ));

        let addElement = (<button onClick={this.showAddInput.bind(this)}>Add fermentable</button>);

        //Fermentables referenced here are not recipe specific fermentables
        if (this.state.add) {
            addElement = (
                <AutoComplete
                    ref="autocomplete"
                    data={Fermentables.find({potential: {$exists: true}}).fetch()}
                    onSelected={this.add.bind(this)}
                    onExit={this.finishedAdding.bind(this)}/>
            );
        }

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount (kg)</th>
                            <th>EBC</th>
                            <th>Yield</th>
                            <th>Amount (%)</th>
                        </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        <td colSpan="4">Total amount (kg)</td>
                        <td>{totalFermentables}</td>
                    </tr>
                    <tr>
                        <td colSpan="4">Expected OG</td>
                        <td>{expectedOG}</td>
                    </tr>
                    </tfoot>
                    <tbody>
                        {items}
                    </tbody>
                </table>
                {addElement}
            </div>
        );
    }
}