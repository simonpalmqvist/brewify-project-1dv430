/**
 * @description Recipe page, page for editing and creating recipes
 * @author simonpalmqvist
 */

//Modules
import React from "react";
import ReactDOM from "react-dom";
import { _ } from "meteor/underscore";
import { createContainer } from "meteor/react-meteor-data";
import { connect }  from "react-redux";

//Actions
import { updateRecipe } from "../actions/RecipeActions";

//Collections
import { Recipes } from "../../api/recipes/Recipes";
import { RecipeFermentables } from "../../api/recipes/fermentables/RecipeFermentables";
import { RecipeHops } from "../../api/recipes/hops/RecipeHops";
import { RecipeYeasts } from "../../api/recipes/yeasts/RecipeYeasts";
import { RecipeIngredients } from "../../api/recipes/ingredients/RecipeIngredients";
import { Fermentables } from "../../api/brewerydb/Fermentables";
import { Hops } from "../../api/brewerydb/Hops";
import { Yeasts } from "../../api/brewerydb/Yeasts";
import { Ingredients } from "../../api/brewerydb/Ingredients";
import { Styles } from "../../api/brewerydb/Styles";

//Helpers
import { calcIngredientWeight } from "../helpers/beerCalc";
import { HOPS } from "../helpers/recipeStandards";

//Components
import RecipeInfo from "../components/recipe/RecipeInfo";
import FermentablesList from "../components/recipe/FermentablesList";
import HopsList from "../components/recipe/HopsList";
import YeastInfo from "../components/recipe/YeastInfo";
import IngredientsList from "../components/recipe/IngredientsList";
import StyleInfo from "../components/recipe/StyleInfo";
import SettingsInfo from "../components/recipe/SettingsInfo";

class Recipe extends React.Component {

    render() {
        const {
            recipe,
            recipeFermentables,
            recipeHops,
            recipeYeast,
            recipeIngredients,
            recipeStyle,
            fermentables,
            hops,
            yeasts,
            ingredients,
            styles } = this.props;

        const recipeId = recipe._id;

        return (
            <div>
                <div className="col-wrapper">
                    <div className="col col-1-1">
                        <div className="content-box full-width-mobile main-settings">
                            <RecipeInfo
                                recipe={recipe}
                                recipeFermentables={recipeFermentables}
                                recipeHops={recipeHops}
                                recipeYeast={recipeYeast}/>
                        </div>
                    </div>
                </div>

                <div className="col-wrapper">
                    <div className="col col-3-4 break-laptop">
                        <div className="content-box extract full-width-mobile">
                            <FermentablesList
                                fermentables={fermentables}
                                recipeFermentables={recipeFermentables}
                                fermentableWeight={calcIngredientWeight(recipeFermentables)}
                                recipeId={recipeId}/>
                        </div>
                        <div className="content-box hops full-width-mobile">
                            <HopsList
                                hops={hops}
                                recipeHops={recipeHops}
                                use={HOPS.USE.BOIL}
                                hopWeight={calcIngredientWeight(recipeHops)}
                                recipeId={recipeId}/>
                        </div>
                        <div className="content-box other-ingredients full-width-mobile">
                            <IngredientsList
                                ingredients={ingredients}
                                recipeIngredients={recipeIngredients}
                                recipeId={recipeId}/>
                        </div>
                    </div>
                    <div className="col col-1-4 break-laptop">
                        <div className="content-box yeast full-width-mobile">
                            <YeastInfo
                                recipeYeast={recipeYeast}
                                yeasts={yeasts}
                                recipeId={recipeId} />
                        </div>
                        <div className="content-box style full-width-mobile">
                            <StyleInfo
                                recipeStyle={recipeStyle}
                                styles={styles}
                                recipeId={recipeId} />
                        </div>
                        <div className="content-box full-width-mobile">
                            <SettingsInfo recipe={recipe}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Recipe.defaultProps = {
    recipe: {},
    recipeFermentables: [],
    recipeHops: [],
    recipeIngredients: [],
    fermentables: [],
    hops: [],
    yeasts: [],
    ingredients: []
};

function joinArrayUniqByName(arr1, arr2) {
    //Create copy of array and get the latest added
    arr1 = arr1.slice(0).reverse();

    //Return array with unique names on objects
    return _.uniq([...arr1, ...arr2], (item) => item.name);
}

function getIngredientsForRecipe(list, id) {
    return list.filter((item) => item.recipeId === id);
}


//Creates meteor container to provide subscribed data
const RecipeContainer = createContainer(({params}) => {
    const { id }          = params;
    const recipe          = Recipes.findOne(id) || {};
    const allFermentables = RecipeFermentables.find().fetch();
    const allHops         = RecipeHops.find().fetch();
    const allYeasts       = RecipeYeasts.find().fetch();
    const allIngredients  = RecipeIngredients.find().fetch();

    //Prepend the product ID to yeast name
    let yeasts = Yeasts.find().fetch().map((yeast) => {
        const {name, productId} = yeast;
        yeast.name = productId ? `${productId} ${name}` : name;
        return yeast;
    });

    //Return all the necessary information for rendering recipe and using autocomplete functionality
    return {
        recipe:             recipe,
        recipeFermentables: getIngredientsForRecipe(allFermentables, id),
        recipeHops:         getIngredientsForRecipe(allHops, id),
        recipeYeast:        getIngredientsForRecipe(allYeasts, id)[0],
        recipeIngredients:  getIngredientsForRecipe(allIngredients, id),
        recipeStyle:        Styles.findOne({_id: recipe.styleId}),
        fermentables:       joinArrayUniqByName(allFermentables, Fermentables.find().fetch()),
        hops:               joinArrayUniqByName(allHops, Hops.find().fetch()),
        yeasts:             joinArrayUniqByName(allYeasts, yeasts),
        ingredients:        joinArrayUniqByName(allIngredients, Ingredients.find().fetch()),
        styles:             Styles.find().fetch()
    };
}, Recipe);

//Map the current state to the properties in component
function mappingStateToProps({ flashMessages }) {
    return {
        save: flashMessages.save,
        error: flashMessages.error
    };
}

export default connect(mappingStateToProps)(RecipeContainer);