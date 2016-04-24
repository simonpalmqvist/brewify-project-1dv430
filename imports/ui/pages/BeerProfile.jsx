/**
 * @description Brew profile page, page for editing the users brew profile
 * @author simonpalmqvist
 */

import React from "react";
import ReactDOM from "react-dom";

import { createContainer } from "meteor/react-meteor-data";
import { connect }  from "react-redux";

import { BrewProfiles } from "../../api/brewprofiles/BrewProfiles";

import Input from "../components/base/Input";

class BrewProfile extends React.Component {



    render() {
        const update = () => console.log("yay");
        const { brewProfile } = this.props;

        return (
            <div className="content-box full-width-mobile">
                <Input name="name"
                       value={brewProfile.efficiency}
                       attr={{type: "number"}}
                       onUpdate={update}/>
            </div>
        );
    }
}

BrewProfile.defaultProps = {brewProfile: {}};

//Creates meteor container to provide subscribed data
const BrewProfileContainer = createContainer(() => {

    return {brewProfile: BrewProfiles.findOne({})};

}, BrewProfile);

//Map the current state to the properties in component
function mappingStateToProps({ flashMessages, browser }) {
    return {
        save: flashMessages.save,
        error: flashMessages.error,
        mobile: browser.mobile
    };
}

export default connect(mappingStateToProps)(BrewProfileContainer);