import React, { Component } from "react";
import { Tabs, Tab, Table, Row, Col, ListGroup } from "react-bootstrap";
import "./workoutsStatistics.scss";

export default class WorkoutsStatistics extends Component {
  state = {
    statistics: {},
    workouts: {}
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

  componentDidUpdate = prevProps => {
    if (prevProps.workouts !== this.props.workouts) {
      this.setState({ workouts: this.props.workouts });
      this.downloadData();
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
      <Tab.Container key={el.date} defaultActiveKey="#link1">
        <Row>
          <Col>
            <ListGroup>
              <ListGroup.Item>{el.date}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <Tab.Content>
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
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  };

  renderPlan = el => {
    return (
      <Tab key={el} eventKey={el} title={el}>
        {this.state.workouts[el]
          ? this.state.workouts[el].map(this.showExercises)
          : null}
      </Tab>
    );
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <Tabs defaultActiveKey="home">
          {/* <Tab eventKey="home" title="Wybierz">
            <p>Wybierz plan, aby zobaczyć statystyki</p>
          </Tab> */}
          {this.props.workoutsArray
            ? this.props.workoutsArray.map(this.renderPlan)
            : null}
        </Tabs>
      </div>
    );
  }
}
