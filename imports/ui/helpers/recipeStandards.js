/**
 * @description recipe standard values to be used when data is missing from external API
 * @author simonpalmqvist
 */

export const EFFICIENCY = 75;

export const BATCHSIZE = 20;

export const BOILTIME = 60;

export const EVAP_RATE = 20;

export const WATER_GRAIN_RATIO = 3;

export const BOIL_LOSS = 0;

export const LAUTER_DEAD_SPACE = 0;

export const GRAIN_TEMP = 21;

export const HOPS = Object.freeze({
    FORM: Object.freeze({
        LEAF: 1,
        PELLET: 2,
        EXTRACT: 3
    }),
    USE: Object.freeze({
        BOIL: 1,
        DRY_HOP: 2
    })
});

export const YEAST = Object.freeze({
    FORM: Object.freeze({
        LIQUID: 1,
        DRY: 2
    }),
    TYPE: Object.freeze({
        ALE: 1,
        LAGER: 2,
        WHEAT: 3,
        CHAMPAGNE: 4,
        WINE: 5
    })
});

export const INGREDIENT = Object.freeze({
    ADDED: Object.freeze({
        MASH: 1,
        BOIL: 2,
        PRIMARY: 3,
        SECONDARY: 4,
        BOTTLE: 5,
        KEG: 6
    }),
    TIMETYPE: Object.freeze({
        MIN: 1,
        DAYS: 2
    })
});