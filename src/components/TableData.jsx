import React, { Component } from 'react';

class TableData extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <table className="table" >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>To Do</th>
                        <th>Location</th>
                        <th>Note</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.children}
                </tbody>
            </table>
        );
    }
}

export default TableData;