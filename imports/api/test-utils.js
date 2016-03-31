import { Meteor } from "meteor/meteor";
import { Factory } from "meteor/dburles:factory";
import { _ } from "meteor/underscore";
import faker from "faker";
import { StubCollections } from "meteor/stub-collections";

import { Items } from "../api/items/Items";

Factory.define("item", Items, {text: () => faker.lorem.words()});

export function createItems(numberOfItems) {
    return _.times(numberOfItems, i => Factory.create("item"));
}

export function stubItems() {
    StubCollections.stub(Items);
}

export function restoreCollections() {
    StubCollections.restore();
}