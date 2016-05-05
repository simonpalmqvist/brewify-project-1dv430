/**
 * @description A collection of beer calculations used for making beer recipes
 * @author simonpalmqvist
 */

import { HOPS, YEAST, INGREDIENT } from "./recipeStandards";

/**
 * Function to convert colors from the SRM standard to EBC
 * @param srm - SRM color number
 * @returns {number} returns EBC color number
 */
export function srmToEbc(srm) {
    return Math.round(srm * 1.97);
}

/**
 * Function to convert colors from the EBC standard to SRM
 * @param ebc - EBC color number
 * @returns {number} returns SRM color number
 */
export function ebcToSrm(ebc) {
    return Math.round(ebc / 1.97);
}

/**
 * Function to calculate beers expected color in EBC
 * @param fermentables - {ebc, amount}
 * @param recipe - {efficiency, batchSize, lossFermentation, lossKettle}
 * @returns {number} returns expected ebc for beer
 */
export function calcBeerEbc(fermentables, recipe) {
    //TODO: Read these values from brew profile
    const efficiency = 0.80;
    const waterAfterBoil = recipe.batchSize + 0.5 + 2;

    const totalFermentableEbc = fermentables
        .map(({ebc, amount}) => ebc * amount)
        .reduce(_sum, 0);

    let result = (totalFermentableEbc * 10 * efficiency) / waterAfterBoil;

    return _round(result, 0);
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
 * Function to calculate the expected FG
 * @param yeastAttenuation
 * @param og
 * @returns {number} - returns expected FG
 */
export function calcExpectedFg(yeastAttenuation, og) {
    let result = og - ((og*1000-1000)*(yeastAttenuation/100)/1000);

    return _round(result, 3);
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
 * Function to get text representation of when ingredient was added
 * @param added
 * @returns {String}
 */
export function ingredientAddedToText(added) {
    let result;

    switch (added) {
        case INGREDIENT.ADDED.MASH:
            result = "Mashing";
            break;
        case INGREDIENT.ADDED.BOIL:
            result = "Boiling";
            break;
        case INGREDIENT.ADDED.PRIMARY:
            result = "Primary fermentation";
            break;
        case INGREDIENT.ADDED.SECONDARY:
            result = "Secondary fermentation";
            break;
        case INGREDIENT.ADDED.BOTTLE:
            result = "Bottling";
            break;
        case INGREDIENT.ADDED.KEG:
            result = "Kegging";
            break;
        default:
            throw new Error("Type value doesn't exist for enumeration INGREDIENT.ADDED");
    }
    return result;
}


/**
 * Function to get text representation of ingredient time type
 * @param timeType
 * @returns {String}
 */
export function ingredientTimeTypeToText(timeType) {
    let result;

    switch (timeType) {
        case INGREDIENT.TIMETYPE.MIN:
            result = "Minutes";
            break;
        case INGREDIENT.TIMETYPE.DAYS:
            result = "Days";
            break;
        default:
            throw new Error("Type value doesn't exist for enumeration INGREDIENT.ADDED");
    }
    return result;
}

/**
 * Function to convert ebc to hex color
 * @param ebc - ebc color
 * @returns {string} - hex color
 */
export function ebcToHex(ebc) {
    let result;

    switch (ebcToSrm(ebc)) {
        case 0:
        case 1:
            result = "FFE699";
            break;
        case 2:
            result = "FFD878";
            break;
        case 3:
            result = "FFCA5A";
            break;
        case 4:
            result = "FFBF42";
            break;
        case 5:
            result = "FBB123";
            break;
        case 6:
            result = "F8A600";
            break;
        case 7:
            result = "F39C00";
            break;
        case 8:
            result = "EA8F00";
            break;
        case 9:
            result = "E58500";
            break;
        case 10:
            result = "DE7C00";
            break;
        case 11:
            result = "D77200";
            break;
        case 12:
            result = "CF6900";
            break;
        case 13:
            result = "CB6200";
            break;
        case 14:
            result = "C35900";
            break;
        case 15:
            result = "BB5100";
            break;
        case 16:
            result = "B54C00";
            break;
        case 17:
            result = "B04500";
            break;
        case 18:
            result = "A63E00";
            break;
        case 19:
            result = "A13700";
            break;
        case 20:
            result = "9B3200";
            break;
        case 21:
            result = "952D00";
            break;
        case 22:
            result = "8E2900";
            break;
        case 23:
            result = "882300";
            break;
        case 24:
            result = "821E00";
            break;
        case 25:
            result = "7B1A00";
            break;
        case 26:
            result = "771900";
            break;
        case 27:
            result = "701400";
            break;
        case 28:
            result = "6A0E00";
            break;
        case 29:
            result = "660D00";
            break;
        case 30:
            result = "600903";
            break;
        case 31:
            result = "5E0B00";
            break;
        case 32:
            result = "5A0A02";
            break;
        case 33:
            result = "520907";
            break;
        case 34:
            result = "4C0505";
            break;
        case 35:
            result = "470606";
            break;
        case 36:
            result = "440607";
            break;
        case 37:
            result = "3F0708";
            break;
        case 38:
            result = "3B0607";
            break;
        case 39:
            result = "3A070B";
            break;
        case 40:
            result = "36080A";
            break;
        default:
            result = "000000";
            break;
    }
    return "#" + result;
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