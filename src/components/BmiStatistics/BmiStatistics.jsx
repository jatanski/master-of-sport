import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "./bmiStatistics.scss";

export default class BmiStatistics extends Component {
  state = {
    bmi: []
  };

  async componentDidMount() {
    const token = localStorage.getItem("x-auth-token");
    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-auth-token": token
    };

    try {
      let response = await fetch("/bmi", {
        method: "get",
        headers: requestHeaders
      });
      if (response.status !== 200) throw response;
      response = await response.json();
      this.setState({ bmi: response });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  showResult = el => {
    let color = "";
    if (el.category === "Wygłodzenie") color = "red";
    else if (el.category === "Wychudzenie") color = "red";
    else if (el.category === "Niedowaga") color = "orange";
    else if (el.category === "Wartość prawidłowa") color = "green";
    else if (el.category === "Nadwaga") color = "orange";
    else if (el.category === "I stopień otyłości") color = "red";
    else if (el.category === "II stopień otyłości") color = "red";
    else if (el.category === "III stopień otyłości") color = "red";

    return (
      <tr key={el.date}>
        <td>{el.date}</td>
        <td style={{ color: color }}>{el.value}</td>
        <td style={{ color: color }}>{el.category}</td>
      </tr>
    );
  };

  render() {
    return (
      <div className="bmiTableWrap">
        <Table
          variant="dark"
          className="bmiTableWrap__table"
          striped
          bordered
          hover
        >
          <thead>
            <tr>
              <td>Data</td>
              <td>BMI</td>
              <td>Stan</td>
            </tr>
          </thead>
          <tbody>
            {this.state.bmi ? this.state.bmi.map(this.showResult) : null}
          </tbody>
        </Table>
      </div>
    );
  }
}
