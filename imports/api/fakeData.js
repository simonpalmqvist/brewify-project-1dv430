/**
 * @description Fake data for tests
 * @author simonpalmqvist
 */

import faker from "faker";
import { Random } from "meteor/random";

export function brewProfile(userId) {
    return {
        userId,
        efficiency: faker.random.number({min: 0, max: 100}),
        batchSize: faker.random.number({min: 0, max: 1000}),
        boilTime: faker.random.number({min: 0, max: 120}),
        evapRate: faker.random.number({min: 0, max: 100}),
        waterGrainRatio: faker.random.number({min: 0, max: 10}),
        boilLoss: faker.random.number({min: 0, max: 10}),
        lauterDeadSpace: faker.random.number({min: 0, max: 10}),
        grainTemp: faker.random.number({min: 0, max: 100})
    };
}

export function recipe(id) {
    return {
        userId: id || Random.id(),
        name: faker.lorem.words(),
        batchSize: faker.random.number({min: 10, max: 1000}),
        boilTime: faker.random.number({min: 30, max: 1000})
    };
}

export function fermentable() {
    return {
        id: faker.random.number({min: 1, max: 1000}),
        name: faker.lorem.words(),
        srmPrecise: faker.random.number({min: 2, max: 1000}),
        potential: faker.random.number({min: 1.000, max: 1.060, precision: 0.001})
    };
}

export function hop() {
    return {
        id: faker.random.number({min: 1, max: 1000}),
        name: faker.lorem.words(),
        alphaAcidMin: faker.random.number({min: 0, max: 100, precision: 0.01}),
        alphaAcidMax: faker.random.number({min: 0, max: 100, precision: 0.01})
    };
}

export function yeast() {
    return {
        id: faker.random.number({min: 1, max: 1000}),
        name: faker.random.words(),
        form: faker.random.number({min: 1, max: 2}),
        type: faker.random.number({min: 1, max: 5}),
        attenuation: faker.random.number({min: 0, max: 100, precision: 0.01}),
        minTemperature: faker.random.number({min: 0, max: 100, precision: 0.1}),
        maxTemperature: faker.random.number({min: 0, max: 100, precision: 0.1}),
        minAlcoholTolerance: faker.random.number({min: 0, max: 20, precision: 0.1}),
        maxAlcoholTolerance: faker.random.number({min: 0, max: 20, precision: 0.1})
    };
}

export function ingredient() {
    return {
        id: faker.random.number({min: 1, max: 1000}),
        name: faker.random.words()
    };
}