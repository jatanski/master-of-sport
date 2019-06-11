import React, { Component } from "react";
import { Form, Button, Dropdown, Table } from "react-bootstrap";
import CustomAlert from "../../components/Alert/Alert";

export default class NewTraining extends Component {
  state = {
    trainings: [],
    exercises: false
  };

  async componentDidMount() {
    const token = localStorage.getItem("x-auth-token");
    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-auth-token": token
    };

    try {
      let response = await fetch("/plans", {
        method: "get",
        headers: requestHeaders
      });
      if (response.status !== 200) throw response;
      response = await response.json();
      this.setState({ trainings: response });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  showPlanToChoose = el => {
    console.log(el);

    return (
      <Dropdown.Item
        key={el._id}
        onClick={this.renderTable.bind(this, el)}
        as="button"
      >
        {el.name}
      </Dropdown.Item>
    );
  };

  renderTable = el => {
    console.log(el);
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <td>Nazwa ćwiczenia</td>
            <td>Seria 1</td>
            <td>Seria 2</td>
            <td>Seria 3</td>
            <td>Seria 4</td>
            <td>Seria 5</td>
          </tr>
        </thead>
        <tbody>{el.exercises.map(this.renderExercises)}</tbody>
        {this.setState({ exercises: true })}
      </Table>
    );
  };

  renderExercises = el => {
    // const numberOfSeries = Number(el.series);
    // const series = [];
    // for (let i = 0; i < numberOfSeries; i++) {
    //   series.push(i);
    // }
    return (
      <tr key={el.name}>
        <td>{el.name}</td>
        <td />
        <td />
        <td />
        <td />
        <td />
      </tr>
    );
  };

  render() {
    return (
      <div>
        <h1>Wybierz Trening</h1>
        <Dropdown>
          <Dropdown.Toggle variant="info" id="choosePlan">
            Wybierz plan treningowy
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {this.state.trainings
              ? this.state.trainings.map(this.showPlanToChoose)
              : null}
          </Dropdown.Menu>
        </Dropdown>
        {this.state.exercises ? this.renderTable : <div />}
      </div>
    );
  }
}
