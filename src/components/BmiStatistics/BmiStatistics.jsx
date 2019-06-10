import React, { Component } from "react";
import { Table } from "react-bootstrap";

export default class BmiStatistics extends Component {
  componentDidMount() {}

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>Data</td>
            <td>BMI</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>11.06.2019</td>
            <td>25.8</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}
