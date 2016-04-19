/**
 * @description Table component to handle table structure depending if mobile or not
 * @author simonpalmqvist
 */

import React from "react";


class Table extends React.Component {

    toColumn(content, i) {
        return (<td key={i}>{content}</td>);
    }

    toMobileRow(content, i) {
        const { headerRow } = this.props;

        let result;

        if (content) {
            result = (
                <tr key={i}>
                    <td>{headerRow[i % headerRow.length]}</td>
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

        if (mobile) {
            body = bodyRows
                .reduce((a,b) => a.concat(b),[])
                .map(this.toMobileRow.bind(this));
        } else {
            header = headerRow.map((content, i) => (<th key={i}>{content}</th>));
            footer = footerRow.map(this.toColumn);
            body = bodyRows.map((row, i) => (<tr key={i}>{row.map(this.toColumn)}</tr>));
        }

        console.log(header,footer,body);

        return (
            <table>
                <thead><tr>{header}</tr></thead>
                <tfoot>{footer}</tfoot>
                <tbody>{body}</tbody>
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