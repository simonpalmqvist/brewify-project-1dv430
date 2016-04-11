/**
 * @description Service to sync data from external API BreweryDB.com
 * @author simonpalmqvist
 */

//Modules
import { Meteor } from "meteor/meteor";
import { HTTP } from "meteor/http";

//Collections
import { Hops } from "../brewerydb/Hops";
import { Fermentables } from "../brewerydb/Fermentables";
import { Yeasts } from "../brewerydb/Yeasts";
import { Ingredients } from "../brewerydb/Ingredients";
import { Styles } from "../brewerydb/Styles";

//Key and url to fetch data from
const { breweryDbUrl, breweryDbToken } = Meteor.settings;

//rest endpoints and collections to store in
const sources = [
    {collection: Hops, endpoint: "hops"},
    {collection: Fermentables, endpoint: "fermentables"},
    {collection: Yeasts, endpoint: "yeasts"},
    {collection: Ingredients, endpoint: "ingredients"},
    {collection: Styles, endpoint: "styles"}
];

/**
 * Function to sync data from external source BreweryDB and store it in collections
 */
export function syncBreweryDB() {
    //Only sync when breweryDB settings are set
    if (breweryDbToken && breweryDbUrl) {
        sources.forEach(({collection, endpoint}) => getData(collection, endpoint));
    }
}

/**
 * Function to get and store data from brewery DB
 * @param Collection - Collection to store data in
 * @param endpoint - where to fetch from
 * @param page - page to start fetching from (default 1)
 */
function getData(Collection, endpoint, page = 1) {

    //Make HTTP request to
    HTTP.get(breweryDbUrl + endpoint, {params: { key: breweryDbToken, p: page}}, (error, response) => {

        //If error throw meteor error
        if (error) {
            throw Meteor.Error("Could not sync with breweryDB");
        }

        let {data, numberOfPages} = response.data;

        //For each ingredient or beer typ upsert it to specified collection
        data.forEach((object) => Collection.upsert({id: object.id}, object));

        //If there are pages remaining get them as well
        if (numberOfPages && page !== numberOfPages) {
            getData(Collection, endpoint, page + 1);
        }
    });
}