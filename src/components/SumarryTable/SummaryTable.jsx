import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "./summaryTable.scss";

export default class SummaryTable extends Component {
  render() {
    return (
      <Table
        className="caloriesSummaryTable"
        striped
        bordered
        hover
        variant="dark"
      >
        <tbody>
          <tr>
            <td />
            <td>Kalorie</td>
            <td>Białko</td>
            <td>Węglowodany</td>
            <td>Tłuszcze</td>
          </tr>
          <tr>
            <td>Suma dobowa</td>
            <td>0,0 kcal</td>
            <td>0,0 g</td>
            <td>0,0 g</td>
            <td>0,0 g</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}
