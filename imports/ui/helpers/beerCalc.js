/**
 * @description A collection of beer calculations used for making beer recipes
 * @author simonpalmqvist
 */

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
 * @param fermentables - {amount, extractYield}
 * @param recipe - {efficiency, batchSize, lossFermentation, lossKettle}
 * @returns {number} - returns expected OG
 */
export function calcExpectedOg(fermentables, recipe) {
    const oechsleKG = 400;
    //TODO: Read these values from brew profile
    const efficiency = 0.80;
    const waterAfterBoil = recipe.batchSize + 0.5 + 2; // + recipe.lossFermentation + recipe.lossKettle

    return fermentables
        .map(({amount, extractYield}) => (oechsleKG * (extractYield/100) * amount * efficiency / waterAfterBoil) / 1000)
        .reduce(sum, 1);
}

/**
 * Function to sum up total weight/amount of fermentables
 * @param fermentables - {amount}
 * @returns {number} - returns total weight/amount of fermentables
 */
export function calcFermentableWeight(fermentables) {
    return fermentables
        .map(({amount}) => amount)
        .reduce(sum, 0);
}

function sum(a,b) {
    return a + b;
}