import React, { Component } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import CustomAlert from "../../components/Alert/Alert";

export default class NewPlanForm extends Component {
  state = {
    name: "",
    numberOfExercises: 0,
    exercises: [],
    showFalsePopUp: false,
    showSuccessPopUp: false,
    disabledSave: true
  };

  exercises = [];

  alertText = {
    success: {
      header: "Plan został zapisany pomyślnie.",
      desc:
        "Możesz teraz wsprowadzić swój pierwszy trening. Albo zrobić coś innego. Wybór należy do Ciebie."
    },
    fail: {
      header: "Coś poszło nie tak ;/",
      desc: "Plan o tej nazwie już istnieje. Spróbuj wpisać inną nazwę."
    }
  };

  closeFalsePopUp = () => this.setState({ showFalsePopUp: false });
  closeSuccessPopUp = () => this.setState({ showSuccessPopUp: false });

  collectPlanName = e => {
    if (e.target.value) this.setState({ disabledSave: false });
    else this.setState({ disabledSave: true });
    const state = {};
    state[`${e.target.id}`] = e.target.value;
    this.setState(state);
    console.log(this.state);
  };

  collectExercises = e => {
    if (e.target.id % 2 === 0 || e.target.id % 2 === 1) {
      this.exercises[e.target.id - 1][0] = e.target.value;
    } else {
      this.exercises[e.target.id - 1.5][1] = e.target.value;
    }
  };

  addNewExercises = () => {
    this.setState({
      numberOfExercises: this.state.numberOfExercises + 1,
      exercises: [
        ...this.state.exercises,
        {
          number: this.state.numberOfExercises + 1,
          numberOfSeries: this.state.numberOfExercises + 1.5
        }
      ]
    });
    this.exercises.push({});
    console.log(this.exercises);
  };

  savePlan = async () => {
    const exercisesToSend = [];
    console.log(this.exercises);
    // eslint-disable-next-line array-callback-return
    this.exercises.map((el, i) => {
      exercisesToSend.push({});
      exercisesToSend[i].name = el[0];
      exercisesToSend[i].series = el[1];
    });

    console.log(exercisesToSend);

    const token = localStorage.getItem("x-auth-token");
    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-auth-token": token
    };
    const requestBody = {
      name: this.state.name,
      exercises: exercisesToSend
    };

    console.log(requestBody);
    try {
      let response = await fetch("/plans", {
        method: "post",
        headers: requestHeaders,
        body: JSON.stringify(requestBody)
      });
      if (response.status === 400) {
        this.setState({ showFalsePopUp: true });
      }
      if (response.status !== 200) throw response;
      response = await response.json();
      this.setState({ showSuccessPopUp: true });
    } catch (error) {
      console.log(error);
    }
  };

  showExercises = el => {
    return (
      <div key={el.number}>
        <Row>
          <Col>
            <Form.Group onChange={this.collectExercises} controlId={el.number}>
              <Form.Label>Ćwiczenie {el.number} </Form.Label>
              <Form.Control />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group
              onChange={this.collectExercises}
              controlId={el.numberOfSeries}
            >
              <Form.Label>Liczba serii: </Form.Label>
              <Form.Control type="number" />
            </Form.Group>
          </Col>
        </Row>
      </div>
    );
  };

  render() {
    return (
      <Form>
        <Form.Group onChange={this.collectPlanName} controlId="name">
          <Form.Label>Wpisz nazwę treningu</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Label>Wpisz nazwy ćwiczeń: </Form.Label>
        {this.state.exercises
          ? this.state.exercises.map(this.showExercises)
          : null}
        <Button variant="primary" onClick={this.addNewExercises}>
          +
        </Button>
        <br />
        <br />
        <Button
          variant="success"
          disabled={this.state.disabledSave}
          onClick={this.savePlan}
        >
          Zapisz plan
        </Button>
        {this.state.showSuccessPopUp ? (
          <CustomAlert
            header={this.alertText.success.header}
            desc={this.alertText.success.desc}
            close={this.closeSuccessPopUp}
            goToStatistics="true"
            showOff={this.props.showOff}
            disabledOff={this.props.disabledOff}
          />
        ) : null}
        {this.state.showFalsePopUp ? (
          <CustomAlert
            header={this.alertText.fail.header}
            desc={this.alertText.fail.desc}
            close={this.closeFalsePopUp}
          />
        ) : null}
      </Form>
    );
  }
}
