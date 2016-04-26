/**
 * @description Fermentables component to contain all fermentables
 * @author simonpalmqvist
 */

import React from "react";

import { addRecipeHop, updateRecipeHop, deleteRecipeHop } from "../../actions/RecipeActions";

import { RecipeHops } from "../../../api/recipes/hops/RecipeHops";

import { hopFormToText } from "../../helpers/beerCalc";
import { HOPS } from "../../helpers/recipeStandards";

import AutoComplete from "../autocomplete/AutoComplete";
import Input from "./../base/Input";
import Select from "./../base/Select";
import ConfirmButton from "./../base/ConfirmButton";
import Table from "../base/Table";

export default class HopsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            add: false
        };
    }

    validateOne(key, value) {
        let obj = {};
        obj[key] = value;
        return RecipeHops.schema.newContext().validateOne(obj, key);
    }

    autoUpdateHop(hop, id) {
        console.log(hop);
        let updates = {
            name: hop.name,
            alpha: hop.alphaAcidMin || hop.alphaAcidMax || hop.alpha || 0
        };

        updateRecipeHop(id, updates);
    }

    showAddInput() {
        //Show input field and set focus on it when rendered
        this.setState({add: true}, () => {
            this.refs.autocomplete.refs.input.focus();
        });
    }

    add(result) {
        const { recipeId, use } = this.props;
        addRecipeHop(recipeId, use, result);
    }

    finishedAdding() {
        this.setState({add: false});
    }


    render() {
        const {mobile, hopWeight, hops, recipeHops} = this.props;

        const headerRow = [
            "Name",
            "Form",
            "Alpha-acid",
            "Amount (g)",
            "Boil time",
            ""
        ];

        const footerRow = [
            "", "", "",
            (<Input
                attr={{type: "number", disabled: true}}
                name="hopWeight"
                value={hopWeight} />),
            "", ""
        ];

        //Sort recipe hops based on time descending and create row
        const bodyRows = recipeHops
            .sort((a, b) => b.time - a.time)
            .map((hop) => {
                const {_id} = hop;
                const updateFun = (value) => updateRecipeHop(_id, value);
                const autoUpdateFun = (hop) => this.autoUpdateHop(hop, _id);
                const deleteFun = () => deleteRecipeHop(_id);

                return [
                    (<AutoComplete
                        data={hops}
                        onSelected={autoUpdateFun}
                        value={hop.name}/>),
                    (<Select name="form"
                             value={hop.form}
                             options={HOPS.FORM}
                             valToText={hopFormToText}
                             onUpdate={updateFun} />),
                    (<Input attr={{type: "number", step: "0.1"}}
                            fixedDecimals={2}
                            name="alpha"
                            validate={this.validateOne}
                            value={hop.alpha}
                            onUpdate={updateFun} />),
                    (<Input attr={{type: "number", step: "5"}}
                            name="amount"
                            value={hop.amount}
                            validate={this.validateOne}
                            onUpdate={updateFun} />),
                    (<Input attr={{type: "number"}}
                            name="time"
                            value={hop.time}
                            validate={this.validateOne}
                            onUpdate={updateFun} />),
                    (<ConfirmButton text="Delete" symbol="×" className="delete" action={deleteFun}/>)
                ];
            });

        //Show button until pressed then show autocomplete input to add hop
        let addElement = (
            <button className="add-hop"
                    onClick={this.showAddInput.bind(this)}>Add hop</button>
        );

        //Hops referenced here are not recipe specific hops
        if (this.state.add) {
            addElement = (
                <AutoComplete
                    className="add-hop"
                    ref="autocomplete"
                    data={hops}
                    onSelected={this.add.bind(this)}
                    onExit={this.finishedAdding.bind(this)}/>
            );
        }

        return (
            <div>
                <h2 className="hop-header">Hops</h2>
                <Table
                    className="recipe-hops"
                    headerRow={headerRow}
                    footerRow={footerRow}
                    bodyRows={bodyRows}
                    mobile={mobile}/>
                {addElement}
            </div>
        );
    }
}