import React, { Component } from "react";
import "./calculatorCalories.scss";
import SummaryTable from "../../components/SumarryTable/SummaryTable";
import { Button } from "react-bootstrap";

export default class CalculatorCalories extends Component {
  render() {
    return (
      <section className="calculatorCalories">
        <br />
        <br />
        <SummaryTable />
        <br />
        <br />
        <Button variant="primary"> Dodaj posiłek</Button>
      </section>
    );
  }
}
