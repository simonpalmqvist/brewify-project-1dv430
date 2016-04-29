/**
 * @description A collection of beer calculations used for making beer recipes
 * @author simonpalmqvist
 */

import { HOPS, YEAST } from "./recipeStandards";

/**
 * Function to convert colors from the SRM standard to EBC
 * @param srm - SRM color number
 * @returns {number} returns EBC color number
 */
export function srmToEbc(srm) {
    return Math.round(srm * 1.97);
}

/**
 * Function to calculate the expected OG
 * @param fermentables - {amount, potential}
 * @param recipe - {efficiency, batchSize, lossFermentation, lossKettle}
 * @returns {number} - returns expected OG
 */
export function calcExpectedOg(fermentables, recipe) {
    //TODO: Read these values from brew profile
    const efficiency = 0.80;
    const waterAfterBoil = _literToGallon(recipe.batchSize + 0.5 + 2);

    let points = fermentables
        .map(({amount, potential}) => _kgToLbs(amount) * _getPoints(potential))
        .reduce(_sum, 0);

    let result = 1+(((points * efficiency) / waterAfterBoil) / 1000);

    return _round(result, 3);
}

/**
 * Function to calculate the expected IBU
 * @param hops - {amount, alpha, time, form}
 * @param recipe - {batchSize, lossFermentation, lossKettle}
 * @param og
 * @returns {number} - returns expected IBU
 */
export function calcExpectedIBU(hops, recipe, og) {
    //TODO: Read these values from brew profile
    const waterAfterBoil = recipe.batchSize + 0.5 + 2;

    const amountOfSugar = 1.65 * Math.pow(0.000125, og - 1);

    let result = hops
        .map(({amount, alpha, time, form}) => {
            return hopEffectivity(form) * amountOfSugar * ((1 - Math.exp(-0.04 * time)) / 4.15) *
                ((alpha * amount * 10) / waterAfterBoil);
        })
        .reduce(_sum, 0);


    return _round(result, 1);
}

/**
 * Function to sum up total weight/amount of ingredients in array
 * @param ingredients - {amount}
 * @returns {number} - returns total weight/amount of ingredients
 */
export function calcIngredientWeight(ingredients) {
    return ingredients
        .map(({amount}) => amount)
        .reduce(_sum, 0);
}

/**
 * Function to get text representation of hop form
 * @param form - number representation of hop form
 * @returns {String}
 */
export function hopFormToText(form) {
    let result;

    switch (form) {
        case HOPS.FORM.PELLET:
            result = "Pellets";
            break;
        case HOPS.FORM.LEAF:
            result = "Cones";
            break;
        case HOPS.FORM.EXTRACT:
            result = "Extract";
            break;
        default:
            throw new Error("Form value doesn't exist for enumeration HOPS.FORM");
    }
    return result;
}

/**
 * Function to get text representation of yeast form
 * @param form - number representation of yeast form
 * @returns {String}
 */
export function yeastFormToText(form) {
    let result;

    switch (form) {
        case YEAST.FORM.LIQUID:
            result = "Liquid yeast";
            break;
        case YEAST.FORM.DRY:
            result = "Dry yeast";
            break;
        default:
            throw new Error("Form value doesn't exist for enumeration YEAST.FORM");
    }
    return result;
}

/**
 * Function to get text representation of yeast type
 * @param type - number representation of yeast type
 * @returns {String}
 */
export function yeastTypeToText(type) {
    let result;

    switch (type) {
        case YEAST.TYPE.ALE:
            result = "Ale yeast";
            break;
        case YEAST.TYPE.LAGER:
            result = "Lager yeast";
            break;
        case YEAST.TYPE.WHEAT:
            result = "Wheat yeast";
            break;
        case YEAST.TYPE.CHAMPAGNE:
            result = "Champagne yeast";
            break;
        case YEAST.TYPE.WINE:
            result = "Wine yeast";
            break;
        default:
            throw new Error("Type value doesn't exist for enumeration YEAST.TYPE");
    }
    return result;
}

/**
 * Function to get value representation from enumeration
 * @param enumeration - to get value from
 * @param text - text representation
 * @returns {Number}
 */
export function enumerationToValue(enumeration, text) {
    let result;

    if (typeof text === "string") {
        result = enumeration[text.toUpperCase()];
    }

    return result;
}

/**
 * Function to get average from two optional values if one value is missing just take that value if both
 * then return 0
 * @param val1
 * @param val2
 * @returns {Number}
 */
export function maybeGetAverage(val1, val2) {
    let result = val1 || val2 || 0;

    if( val1 && val2) {
        result = (val1 + val2) / 2;
    }

    return result;
}

function _getPoints(potential) {
    let result = 0;

    if(potential >= 1) {
        result = (potential * 1000) - 1000;
    }

    return result;
}

function _sum(a,b) {
    return a + b;
}

function _kgToLbs(kg) {
    return kg * 2.20462262;
}

function _literToGallon(liter) {
    return liter * 0.264172052;
}

function _round(value, decimals) {
    const x = Math.pow(10, decimals);

    return Math.round(value * x)/x;
}

function hopEffectivity(form) {
    return form === HOPS.FORM.PELLET ? 1.15 : 1;
}