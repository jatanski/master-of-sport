import React, { Component } from "react";
import { Tabs, Tab, Table, Accordion, Card, Button } from "react-bootstrap";
import "./workoutsStatistics.scss";

export default class WorkoutsStatistics extends Component {
  state = {
    statistics: {},
    workouts: {},
    workoutsArray: []
  };

  componentDidMount = async () => {
    let workouts = {};
    let workoutsArray = [];
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
      response.plans.forEach(el => {
        el.id = `#${el._id}`;
        el.showInput = false;
      });
      response.workouts.forEach(el => {
        workouts[`${el}`] = [];
        workoutsArray.push(el);
      });
      this.setState({ workouts: workouts, workoutsArray: workoutsArray });
      this.downloadData();
    } catch (error) {
      console.log(error);
    }
  };

  downloadData = async () => {
    const token = localStorage.getItem("x-auth-token");
    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-auth-token": token
    };

    try {
      let response = await fetch("/workouts", {
        method: "get",
        headers: requestHeaders
      });
      if (response.status !== 200) throw response;
      response = await response.json();
      this.setState({ statistics: response });
      const workouts = this.state.workouts;
      response.forEach(el => {
        for (const i in workouts) {
          if (i === el.type) {
            const training = { date: el.date, exercises: el.exercises };
            workouts[i].push(training);
          }
        }
      });
      this.setState({ workouts: workouts });
    } catch (error) {
      console.log(error);
    }
  };

  showData = el => {
    const series = [];
    for (const i in el.dataToShow) {
      series.push(el.dataToShow[i]);
    }
    return (
      <tr key={el.name}>
        <td>{el.name}</td>
        {series.map(el => {
          return (
            <td key={Math.random()}>
              <thead>
                <tr>
                  <td>Powt</td>
                  <td>Ciężar</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{el[0]}</td>
                  <td>{el[1]}</td>
                </tr>
              </tbody>
            </td>
          );
        })}
      </tr>
    );
  };

  showExercises = el => {
    const exercisesArray = [];
    for (const i in el.exercises) {
      exercisesArray.push({
        name: i,
        id: `#${i}`,
        exercises: el.exercises[i],
        dataToShow: []
      });
    }

    exercisesArray.forEach(el => {
      for (const j in el.exercises) {
        el.dataToShow[j] = [];
        for (let k = 0; k < 6; k++) {
          if (j.indexOf(`${k}`) > -1) {
            for (const z in el.exercises[j]) {
              const regRepeat = /repeat$/;
              const regLoad = /load$/;
              if (regRepeat.test(z) === true) {
                el.dataToShow[j].push(el.exercises[j][z]);
              } else if (regLoad.test(z) === true) {
                el.dataToShow[j].push(el.exercises[j][z]);
              }
            }
          }
        }
      }
    });
    return (
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              key={el.date}
              variant="link"
              eventKey={el.date}
            >
              {el.date}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={el.date}>
            <Card.Body>
              <Table
                className="workoutsStatistics__table"
                striped
                bordered
                hover
                variant="dark"
              >
                <thead>
                  <tr>
                    <td>Ćwiczenie</td>
                    <td>Seria 1</td>
                    <td>Seria 2</td>
                    <td>Seria 3</td>
                    <td>Seria 4</td>
                    <td>Seria 5</td>
                  </tr>
                </thead>
                <tbody>{exercisesArray.map(this.showData)}</tbody>
              </Table>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  };

  renderPlan = el => {
    return (
      <Tab
        className="workoutsStatistics__Tabs"
        key={el}
        eventKey={el}
        title={el}
      >
        {this.state.workouts[el]
          ? this.state.workouts[el].map(this.showExercises)
          : null}
      </Tab>
    );
  };

  render() {
    return (
      <div>
        <Tabs className="workoutsStatistics__Tabs" defaultActiveKey="home">
          {this.state.workoutsArray
            ? this.state.workoutsArray.map(this.renderPlan)
            : null}
        </Tabs>
      </div>
    );
  }
}
