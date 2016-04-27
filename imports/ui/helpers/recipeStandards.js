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
        LEAF: 0,
        PELLET: 1,
        EXTRACT: 2
    }),
    USE: Object.freeze({
        BOIL: 0,
        DRY_HOP: 1
    })
});

export const YEAST = Object.freeze({
    FORM: Object.freeze({
        LIQUID: 0,
        DRY: 1
    }),
    TYPE: Object.freeze({
        ALE: 0,
        LAGER: 1,
        WHEAT: 2,
        CHAMPAGNE: 3,
        WINE: 4
    })
});