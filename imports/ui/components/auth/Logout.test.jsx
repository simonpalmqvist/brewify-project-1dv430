/* eslint-env mocha */
/**
 * @description Integration tests for client side logout flow
 * @author simonpalmqvist
 */

//Modules
import { Meteor } from "meteor/meteor";
import chai from "meteor/practicalmeteor:chai";
import { resetDatabase } from "meteor/xolvio:cleaner";
import React from "react";
import ReactTestUtils from "react-addons-test-utils";

//Stores
import AuthStore from "../../stores/AuthStore";

//Components
import Logout from "./Logout";


//Init should
const should = chai.should();


if (Meteor.isClient) {
    describe("Logout component", () => {

        beforeEach((done) => {
            //Reset database
            const server = Meteor.connect(Meteor.absoluteUrl());
            server.call("test.resetdb");

            server.call("test.create-user", (error, account) => {
                Meteor.loginWithPassword(account.email, account.password, () => {
                    done();
                });
            });

        });

        describe("User", (done) => {
            it("Should be able to logout", () => {

                Meteor.user().should.exist;

                //Render component
                logout = ReactTestUtils.renderIntoDocument(<Logout/>);

                AuthStore.on("logout", () => {
                    should.not.exist(Meteor.user());
                    done();
                });
            });

        });

    });
}