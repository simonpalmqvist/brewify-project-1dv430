/**
 * @description Table component to handle table structure depending if mobile or not
 * @author simonpalmqvist
 */

import React from "react";
import classNames from "classNames";

import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Table extends React.Component {

    toColumn(content, i) {
        return (<td key={i}>{content}</td>);
    }

    toMobileRow(content, i) {
        const { headerRow } = this.props;

        let result;
        const headerIndex = i % headerRow.length;

        //Set specific class on first column for each "row"
        const classes = classNames("mobile-row", {"mobile-first-row": headerIndex === 0});

        //Skip row if no content is present and print header column on same row as content
        if (content) {
            //i % headerRow.length gets the correct header based on index of content
            result = (
                    <tr key={i} className={classes}>
                        <th>{headerRow[headerIndex]}</th>
                        <td>{content}</td>
                    </tr>
            );
        }
        return result;
    }

    render() {
        const { headerRow, footerRow, bodyRows, mobile} = this.props;

        let header;
        let footer;
        let body;

        //Handle table different if it's mobile or not
        if (mobile) {
            body = bodyRows
                .reduce((a,b) => a.concat(b),[])
                .map(this.toMobileRow.bind(this));
            footer = footerRow.map(this.toMobileRow.bind(this));
        } else {
            header = headerRow.map((content, i) => (<th key={i}>{content}</th>));
            footer = (<tr>{footerRow.map(this.toColumn)}</tr>);
            body = bodyRows.map((row, i) => (<tr key={i}>{row.map(this.toColumn)}</tr>));
        }

        return (
            <table className="c-table">
                <thead><tr>{header}</tr></thead>
                <tfoot>{footer}</tfoot>

                <ReactCSSTransitionGroup
                    component="tbody"
                    transitionName="c-table-tbody"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                    {body}
                </ReactCSSTransitionGroup>
            </table>
        );
    }
}

Table.defaultProps = {
    headerRow: [],
    footerRow: [],
    bodyRows: [],
    mobile: false
};

export default Table;