/**
 * @description Fermentables component to contain all fermentables
 * @author simonpalmqvist
 */

import React from "react";

import { Fermentables } from "../../../api/brewerydb/Fermentables";

import AutoComplete from "../autocomplete/AutoComplete";

export default class FermentablesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            add: false
        };
    }

    add() {
        this.setState({add: true}, () => {
            this.refs.autocomplete.refs.input.focus();
        });
    }

    finishedAdding() {
        this.setState({add: false});
    }

    render() {
        const {
            fermentables,
            expectedOG,
            totalFermentables,
            addFermentables,
            updateFermentables} = this.props;

        let items = fermentables.map(() => (
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        ));

        let addElement = (<button onClick={this.add.bind(this)}>Add fermentable</button>);

        if (this.state.add) {
            addElement = (
                <AutoComplete
                    ref="autocomplete"
                    data={Fermentables.find({potential: {$exists: true}}).fetch()}
                    onSelected={addFermentables}
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
                            <th>Potential</th>
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