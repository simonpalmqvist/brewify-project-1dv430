/**
 * @description Recipe page, page for editing and creating recipes
 * @author simonpalmqvist
 */

import React from "react";
import ReactDOM from "react-dom";
import { _ } from "meteor/underscore";
import { createContainer } from "meteor/react-meteor-data";
import { connect }  from "react-redux";

import { updateRecipe } from "../actions/RecipeActions";
import { Recipes } from "../../api/recipes/Recipes";
import { RecipeFermentables } from "../../api/recipes/fermentables/RecipeFermentables";
import { Fermentables } from "../../api/brewerydb/Fermentables";

import Table from "../components/base/Table";

import { calcExpectedOg, calcFermentableWeight } from "../helpers/beerCalc";

import Input from "../components/base/Input";
import FermentablesList from "../components/recipe/FermentablesList";

class Recipe extends React.Component {

    update(value) {
        updateRecipe(this.props.recipe._id, value);
    }

    recipeValidateOne(key, value) {
        let obj = {};
        obj[key] = value;
        return Recipes.schema.newContext().validateOne(obj, key);
    }

    render() {
        const update = this.update.bind(this);
        const { recipe, recipeFermentables, fermentables, mobile } = this.props;


        const bodyRow = [[
            (<Input name="batchSize"
                    attr={{type: "number"}}
                    value={recipe.batchSize}
                    validate={this.recipeValidateOne}
                    onUpdate={update}/>),
            (<Input name="boilTime"
                    attr={{type: "number"}}
                    value={recipe.boilTime}
                    validate={this.recipeValidateOne}
                    onUpdate={update}/>),
            (<Input attr={{type: "number", disabled: true}}
                    fixedDecimals={3}
                    name="expextedOG"
                    value={calcExpectedOg(recipeFermentables, recipe)} />)
        ]];

        return (
            <div>
                <div className="content-box full-width-mobile">
                    <Input name="name"
                           value={recipe.name}
                           className={["input-header", "glass"]}
                           attr={{type: "text"}}
                           validate={this.recipeValidateOne}
                           onUpdate={update}/>

                    <Table
                        headerRow={["Batch size (l)", "Boil time (min)", "OG"]}
                        bodyRows={bodyRow} mobile={mobile}/>
                </div>
                <div className="content-box full-width-mobile">
                    <FermentablesList
                        mobile={mobile}
                        fermentables={fermentables}
                        recipeFermentables={recipeFermentables}
                        fermentableWeight={calcFermentableWeight(recipeFermentables)}
                        recipeId={this.props.recipe._id}/>
                </div>
            </div>
        );
    }
}

Recipe.defaultProps = {
    recipe: {},
    recipeFermentables: []
};

//Creates meteor container to provide subscribed data
const RecipeContainer = createContainer(({params}) => {
    const allFermentables = RecipeFermentables.find().fetch();
    let fermentables = Fermentables.find().fetch();
    let recipeFermentables = allFermentables.filter((f) => f.recipeId === params.id);

    fermentables = _.uniq([...allFermentables.slice(0).reverse(), ...fermentables], (f) => f.name);

    return {
        recipe: Recipes.findOne(params.id),
        recipeFermentables,
        fermentables
    };
}, Recipe);

//Map the current state to the properties in component
function mappingStateToProps({ flashMessages, browser }) {
    return {
        save: flashMessages.save,
        error: flashMessages.error,
        mobile: browser.mobile
    };
}

export default connect(mappingStateToProps)(RecipeContainer);