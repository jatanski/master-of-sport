import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "./circuitsStatistics.scss";

export default class CircuitsStatistics extends Component {
  state = {
    circuits: []
  };

  async componentDidMount() {
    const token = localStorage.getItem("x-auth-token");
    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-auth-token": token
    };

    try {
      let response = await fetch("/circuits", {
        method: "get",
        headers: requestHeaders
      });
      if (response.status !== 200) throw response;
      response = await response.json();
      this.setState({ circuits: response });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  showResult = el => {
    return (
      <tr key={el.date}>
        <td>{el.date}</td>
        <td>{el.weight}</td>
        <td>{el.circuits.calf}</td>
        <td>{el.circuits.thigh}</td>
        <td>{el.circuits.rear}</td>
        <td>{el.circuits.waist}</td>
        <td>{el.circuits.chest}</td>
        <td>{el.circuits.biceps}</td>
        <td>{el.circuits.forearm}</td>
      </tr>
    );
  };

  render() {
    return (
      <div className="circuitsTableWrap">
        <Table
          className="circuitsTableWrap__table"
          striped
          variant="dark"
          bordered
          hover
        >
          <thead>
            <td>Data</td>
            <td>Waga</td>
            <td>Łydka</td>
            <td>Udo</td>
            <td>Pas</td>
            <td>Talia</td>
            <td>Klatka piersiowa</td>
            <td>Biceps</td>
            <td>Przedramię</td>
          </thead>
          <tbody>
            {this.state.circuits
              ? this.state.circuits.map(this.showResult)
              : null}
          </tbody>
        </Table>
      </div>
    );
  }
}
