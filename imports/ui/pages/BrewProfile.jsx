/**
 * @description Brew profile page, page for editing the users brew profile
 * @author simonpalmqvist
 */

import React from "react";
import ReactDOM from "react-dom";
import { browserHistory } from "react-router";
import { createContainer } from "meteor/react-meteor-data";
import { connect }  from "react-redux";

import { BrewProfiles } from "../../api/brewprofiles/BrewProfiles";

import { updateBrewProfile } from "../actions/BrewProfileActions";

import Input from "../components/base/Input";

class BrewProfile extends React.Component {

    update(value) {
        updateBrewProfile(this.props.brewProfile._id, value);
        this._didChange = true;
    }

    transferToDashboard() {
        browserHistory.push("/dashboard");
    }

    validateOne(key, value) {
        let obj = {};
        obj[key] = value;
        return BrewProfiles.schema.newContext().validateOne(obj, key);
    }

    render() {
        const update = this.update.bind(this);
        const { brewProfile } = this.props;

        return (
            <div className="content-box full-width-mobile">
                <h2>Your Brew profile</h2>
                <p>
                    Customize your preferred settings based on your preferences and brewing equipment
                    or stick with the default.
                </p>
                <button onClick={this.transferToDashboard}>{this._didChange ? "Done" : "Skip"}</button>
                <Input name="batchSize"
                       label="Batch Size (l)"
                       value={brewProfile.batchSize}
                       attr={{type: "number"}}
                       validate={this.validateOne}
                       onUpdate={update}/>
                <Input name="boilTime"
                       label="Boil time (min)"
                       value={brewProfile.boilTime}
                       attr={{type: "number"}}
                       validate={this.validateOne}
                       onUpdate={update}/>
                <Input name="efficiency"
                       label="Efficiency (%)"
                       value={brewProfile.efficiency}
                       attr={{type: "number"}}
                       fixedDecimals={2}
                       validate={this.validateOne}
                       onUpdate={update}/>
                <Input name="evapRate"
                       label="Evaporation rate (%/h)"
                       value={brewProfile.evapRate}
                       attr={{type: "number"}}
                       fixedDecimals={2}
                       validate={this.validateOne}
                       onUpdate={update}/>
                <Input name="boilLoss"
                       label="Loss after boil (l)"
                       value={brewProfile.boilLoss}
                       attr={{type: "number"}}
                       validate={this.validateOne}
                       onUpdate={update}/>
                <Input name="lauterDeadSpace"
                       label="Dead space in Mash tun (l)"
                       value={brewProfile.lauterDeadSpace}
                       attr={{type: "number"}}
                       validate={this.validateOne}
                       onUpdate={update}/>
                <Input name="waterGrainRatio"
                       label="Water/Grain ratio (l/kg)"
                       value={brewProfile.waterGrainRatio}
                       attr={{type: "number"}}
                       validate={this.validateOne}
                       onUpdate={update}/>
                <Input name="grainTemp"
                       label="Grain temp (C˚)"
                       value={brewProfile.grainTemp}
                       attr={{type: "number"}}
                       validate={this.validateOne}
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
function mappingStateToProps({ flashMessages }) {
    return {
        save: flashMessages.save,
        error: flashMessages.error
    };
}

export default connect(mappingStateToProps)(BrewProfileContainer);