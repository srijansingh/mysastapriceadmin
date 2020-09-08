import React, { Component } from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default class CustomerComponent extends Component {
    render() {
        let back;
        if((this.props.index) %2 !== 0){
            back = "#f1f1f1"
        }
        else
        {
            back = "ffffff"
        }
        return (
            <TableRow key={this.props.index}>
                <TableCell align="center">{this.props.name}</TableCell>
                <TableCell align="center">{this.props.email}</TableCell>
            </TableRow>
        )
    }
}
