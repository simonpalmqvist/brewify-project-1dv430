/**
 * @description Fake data for tests
 * @author simonpalmqvist
 */

import { lorem, random } from "faker";
import { Random } from "meteor/random";

const { number } = random;
const { words } = lorem;

export function brewProfile(userId) {
    return {
        userId,
        efficiency: number({min: 0, max: 100}),
        batchSize: number({min: 0, max: 1000}),
        boilTime: number({min: 0, max: 120}),
        evapRate: number({min: 0, max: 100}),
        waterGrainRatio: number({min: 0, max: 10}),
        boilLoss: number({min: 0, max: 10}),
        fermenterLoss: number({min: 0, max: 10}),
        lauterDeadSpace: number({min: 0, max: 10}),
        grainTemp: number({min: 0, max: 100})
    };
}

export function recipe(userId = Random.id()) {
    return {
        userId,
        name: words(),
        batchSize: number({min: 10, max: 1000}),
        boilTime: number({min: 30, max: 1000}),
        efficiency: number({min: 0, max: 100}),
        boilLoss: number({min: 0, max: 10}),
        fermenterLoss: number({min: 0, max: 10})
    };
}

export function recipeFermentable(userId = Random.id(), recipeId = Random.id()) {
    return {
        userId,
        recipeId,
        name: words(),
        amount: number({min: 0, max: 10}),
        potential: number({min: 1.000, max: 1.060, precision: 0.001}),
        ebc: number({min: 1, max: 140})
    };
}

export function recipeHop(userId = Random.id(), recipeId = Random.id()) {
    return {
        userId,
        recipeId,
        name: words(),
        form: number({min: 1, max: 3}),
        use: number({min: 1, max: 2}),
        alpha: number({min: 0, max: 100, precision: 0.01}),
        amount: number({min: 0, max: 1000}),
        time: number({min: 0, max: 300})
    };
}

export function recipeYeast(userId = Random.id(), recipeId = Random.id()) {
    return {
        userId,
        recipeId,
        name: words(),
        form: number({min: 1, max: 2}),
        type: number({min: 1, max: 5}),
        attenuation: number({min: 0, max: 100, precision: 0.01}),
        minTemperature: number({min: 0, max: 100, precision: 0.1}),
        maxTemperature: number({min: 0, max: 100, precision: 0.1}),
        minAlcoholTolerance: number({min: 0, max: 20, precision: 0.1}),
        maxAlcoholTolerance: number({min: 0, max: 20, precision: 0.1})
    };
}

export function recipeIngredient(userId = Random.id(), recipeId = Random.id()) {
    return {
        userId,
        recipeId,
        name: words(),
        amount: number({min: 0, max: 1000}),
        added: number({min: 1, max: 6}),
        time: number({min: 0, max: 300}),
        timeType: number({min: 1, max: 2})
    };
}

export function fermentable() {
    return {
        id: number({min: 1, max: 1000}),
        name: words(),
        srmPrecise: number({min: 2, max: 1000}),
        potential: number({min: 1.000, max: 1.060, precision: 0.001})
    };
}

export function hop() {
    return {
        id: number({min: 1, max: 1000}),
        name: words(),
        alphaAcidMin: number({min: 0, max: 100, precision: 0.01}),
        alphaAcidMax: number({min: 0, max: 100, precision: 0.01})
    };
}

export function yeast() {
    return {
        id: number({min: 1, max: 1000}),
        name: words(),
        form: number({min: 1, max: 2}),
        type: number({min: 1, max: 5}),
        attenuation: number({min: 0, max: 100, precision: 0.01}),
        minTemperature: number({min: 0, max: 100, precision: 0.1}),
        maxTemperature: number({min: 0, max: 100, precision: 0.1}),
        minAlcoholTolerance: number({min: 0, max: 20, precision: 0.1}),
        maxAlcoholTolerance: number({min: 0, max: 20, precision: 0.1})
    };
}

export function ingredient() {
    return {
        id: number({min: 1, max: 1000}),
        name: words()
    };
}

export function style() {
    return {
        id: number({min: 1, max: 1000}),
        name: words(),
        description: words(),
        minIbu: number({min: 1, max: 20}),
        maxIbu: number({min: 21, max: 60}),
        minAbv: number({min: 1, max: 5}),
        maxAbv: number({min: 6, max: 10}),
        srmMin: number({min: 1, max: 20}),
        srmMax: number({min: 21, max: 60}),
        ogMin: number({min: 1.040, max: 1.050, precision: 0.001}),
        ogMax: number({min: 1.051, max: 1.060, precision: 0.001}),
        fgMin: number({min: 1.006, max: 1.010, precision: 0.001}),
        fgMax: number({min: 1.011, max: 1.015, precision: 0.001})
    };
}