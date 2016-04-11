import { Meteor } from "meteor/meteor";
import { HTTP } from "meteor/http";
import { Hops } from "../brewerydb/Hops";

const { breweryDbUrl, breweryDbToken } = Meteor.settings;


/**
 * Function to sync data from external source BreweryDB and store it in collections
 */
export function syncBreweryDB() {
    if (breweryDbToken && breweryDbUrl) {
        getData(Hops, "hops");
    }
}

/**
 * Function to get and store data from brewery DB
 * @param Collection - Collection to store data in
 * @param type - type of data to fetch from breweryDB
 * @param page - page to start fetching from (default 1)
 */
function getData(Collection, type, page = 1) {

    //Make HTTP request to
    HTTP.get(breweryDbUrl + type, {params: { key: breweryDbToken, p: page}}, (error, response) => {

        //If error throw meteor error
        if (error) {
            throw Meteor.Error("Could not sync with breweryDB");
        }

        let {data, numberOfPages} = response.data;

        //For each ingredient or beer typ upsert it to specified collection
        data.forEach((object) => Collection.upsert({id: object.id}, object));

        //If there are pages remaining get them as well
        if (numberOfPages && page !== numberOfPages) {
            getData(Collection, type, page + 1);
        }
    });
}