/**
 * @description Fermentables component to contain all fermentables
 * @author simonpalmqvist
 */

import React from "react";

import { addRecipeFermentable } from "../../actions/RecipeActions";
import { errorAction } from "../../actions/StatusActions";

import { Fermentables } from "../../../api/brewerydb/Fermentables";

import FermentableRow from "./FermentableRow";
import AutoComplete from "../autocomplete/AutoComplete";
import Input from "./Input";

export default class FermentablesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            add: false
        };
    }

    showAddInput() {
        //Show input field and set focus on it when rendered
        this.setState({add: true}, () => {
            this.refs.autocomplete.refs.input.focus();
        });
    }

    add(error, result) {
        if (error) {
            return errorAction(error);
        }
        addRecipeFermentable(this.props.recipeId, result);
    }

    finishedAdding() {
        this.setState({add: false});
    }

    render() {
        const {
            fermentables,
            expectedOG,
            fermentableWeight} = this.props;

        //Map fermentables to fermentable rows
        let items = fermentables.map((fermentable) => (
            <FermentableRow key={fermentable._id} fermentable={fermentable} totalFermentables={fermentableWeight}/>
        ));

        //Show button until pressed then show autocomplete input to add fermentable
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
                            <th>Yield (%)</th>
                            <th>Amount (%)</th>
                            <th/>
                        </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        <td colSpan="4">Total amount (kg)</td>
                        <td>
                            <Input attr={{type: "number", disabled: true}} fixedDecimals={3}
                                   name="fermentableWeight" value={fermentableWeight} />
                        </td>
                        <td/>
                    </tr>
                    <tr>
                        <td colSpan="4">Expected OG</td>
                        <td>
                            <Input attr={{type: "number", disabled: true}} fixedDecimals={3}
                                   name="expextedOG" value={expectedOG} />
                        </td>
                        <td/>
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