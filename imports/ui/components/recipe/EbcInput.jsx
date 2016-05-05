/**
 * @description Input component for recipes editable values
 * @author simonpalmqvist
 */

import React from "react";

import Input from "../base/Input";

import { ebcToHex } from "../../helpers/beerCalc";

export default class EbcInput extends React.Component {

    render() {
        const { ebc } = this.props;

        const styles = {
            backgroundColor: ebcToHex(ebc)
        };

        return (
            <Input attr={{type: "number", disabled: true}}
                   name="expectedEBC"
                   label="EBC"
                   className="ebc-input"
                   style={styles}
                   value={ebc} />
        );
    }
}