/* eslint-disable array-callback-return */
import React, { Component } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import CustomAlert from "../../components/Alert/Alert";
import "./newPlanForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default class NewPlanForm extends Component {
  state = {
    disabledSave: true,
    exercises: [],
    name: "",
    numberOfExercises: 0,
    showFalsePopUp: false,
    showSuccessPopUp: false
  };

  exercises = [];

  alertText = {
    success: {
      header: "Plan został zapisany pomyślnie.",
      desc:
        "Możesz teraz przejść do sekcji DZISIEJSZY TRENING i wsprowadzić swój pierwszy trening. Albo zrobić coś innego. Wybór należy do Ciebie."
    },
    fail: {
      header: "Coś poszło nie tak ;/",
      desc: "Plan o tej nazwie już istnieje. Spróbuj wpisać inną nazwę."
    },
    goTo1: {
      text: "Dzisiejszy trening",
      link: "/diary"
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
  };

  closeFalsePopUp = () => this.setState({ showFalsePopUp: false });
  closeSuccessPopUp = () => this.setState({ showSuccessPopUp: false });

  collectExercises = e => {
    if (e.target.id % 2 === 0 || e.target.id % 2 === 1) {
      this.exercises[e.target.id - 1][0] = e.target.value;
    } else {
      this.exercises[e.target.id - 1.5][1] = e.target.value;
    }
  };

  collectPlanName = e => {
    if (e.target.value) this.setState({ disabledSave: false });
    else this.setState({ disabledSave: true });
    const state = {};
    state[`${e.target.id}`] = e.target.value;
    this.setState(state);
  };

  savePlan = async () => {
    const exercisesToSend = [];
    this.exercises.map((el, i) => {
      exercisesToSend.push({});
      exercisesToSend[i].name = el[0];
      exercisesToSend[i].series = el[1];
    });

    const token = localStorage.getItem("x-auth-token");
    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-auth-token": token
    };
    const requestBody = {
      name: this.state.name,
      exercises: exercisesToSend
    };

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
      this.props.showDisabledLayer();
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
              <Form.Control autoComplete="off" />
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
      <Form className="workoutPlan__newPlanForm">
        <Form.Group onChange={this.collectPlanName} controlId="name">
          <Form.Label className="circuits__form__dimensions">
            Wpisz nazwę treningu
          </Form.Label>
          <Form.Control autoComplete="off" />
        </Form.Group>
        {this.state.exercises
          ? this.state.exercises.map(this.showExercises)
          : null}
        <Button variant="primary" onClick={this.addNewExercises}>
          <FontAwesomeIcon icon={faPlus} />
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
            goTo1Text={this.alertText.goTo1.text}
            goTo1Link={this.alertText.goTo1.link}
            showOff={this.props.showOff}
            disabledOff={this.props.disabledOff}
            extraFunc={this.props.showOffDisabledLayer}
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
