/* eslint-disable array-callback-return */
import React, { Component } from "react";
import {
  Button,
  Dropdown,
  Table,
  InputGroup,
  FormControl
} from "react-bootstrap";
import CustomAlert from "../../components/Alert/Alert";
import "./todayTraining.scss";

export default class NewTraining extends Component {
  state = {
    choosenPlan: "",
    dateToSend: {},
    exercises: [],
    showDisabledLayer: false,
    showTable: false,
    showSave: false,
    showSuccessPopUp: false,
    showFalsePopUp: false,
    trainings: []
  };
  alertText = {
    success: {
      header: "Trening został zapisany.",
      desc:
        "Możesz teraz przejrzeć swoje treningi w statystykach. Albo zrobić coś innego. Wybór należy do Ciebie."
    },
    fail: {
      header: "Dodałeś już trening.",
      desc: "Spróbuj ponownie jutro."
    },
    goTo1: {
      text: "Statystyki",
      link: "/statistics"
    }
  };

  exercisesAfterFill = {};
  dates = {};

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
      this.setState({
        trainings: response.plans
      });
    } catch (error) {
      console.log(error);
    }
  }

  closeSuccessPopUp = () => this.setState({ showSuccessPopUp: false });
  closeFalsePopUp = () => this.setState({ showFalsePopUp: false });

  collectDate = e => {
    this.exercisesAfterFill[`${e.target.className}`][
      `${e.target.parentElement.id}`
    ][`${e.target.id}`] = e.target.value;
    this.setState({
      dateToSend: this.exercisesAfterFill
    });
  };

  sendToDataBase = async () => {
    const now = `${new Date().getDate()}.${new Date().getMonth() +
      1}.${new Date().getFullYear()}`;
    const token = localStorage.getItem("x-auth-token");
    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-auth-token": token
    };
    const requestBody = {
      kindOfWorkout: this.state.choosenPlan,
      date: now,
      exercises: this.state.dateToSend
    };
    try {
      let response = await fetch("/workouts", {
        method: "post",
        headers: requestHeaders,
        body: JSON.stringify(requestBody)
      });
      if (response.status === 400) {
        this.setState({ showFalsePopUp: true });
      }
      if (response.status !== 200) throw response;
      response = await response.json();
      this.setState({ showSuccessPopUp: true, showDisabledLayer: true });
    } catch (error) {
      console.log(error);
    }
  };

  showDisabledLayer = () => this.setState({ showDisabledLayer: true });
  showOffDisabledLayer = () =>
    this.setState({
      choosenPlan: "",
      dateToSend: {},
      exercises: [],
      showDisabledLayer: false,
      showTable: false,
      showSave: false,
      showSuccessPopUp: false,
      showFalsePopUp: false,
      trainings: []
    });

  showPlanToChoose = el => {
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
    this.setState({ choosenPlan: el.name });
    const exercises = [];
    el.exercises.map((exercise, i) => {
      exercises.push({
        name: exercise.name,
        series: Number(exercise.series),
        seriesArray: []
      });
      this.exercisesAfterFill[`${exercise.name}`] = {};
      for (let j = 0; j < exercises[i].series; j++) {
        exercises[i].seriesArray.push({});
        this.exercisesAfterFill[`${exercise.name}`][
          `${exercise.name}-${j}`
        ] = {};
      }
    });
    this.setState({
      showTable: true,
      exercises: exercises,
      showSave: true
    });
  };

  renderExercises = el => {
    const series = [];
    for (let i = 0; i < el.series; i++) {
      series.push({
        key: `${el.name}-${i}`,
        idRepeat: `${el.name}-${i}-repeat`,
        idLoad: `${el.name}-${i}-load`,
        tagName: `${el.name}-tag`
      });
    }
    return (
      <tr key={el.name}>
        <td>{el.name}</td>
        {series.map(series => (
          <td key={series.key}>
            <InputGroup
              className="inputWrapContainer"
              id={series.key}
              size="sm"
            >
              <InputGroup.Prepend>
                <InputGroup.Text>Powtór.</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                onChange={this.collectDate}
                id={series.idRepeat}
                type="number"
                bsPrefix={el.name}
              />

              <InputGroup.Prepend>
                <InputGroup.Text className="inputWrap__weightLabel">
                  Ciężar{" "}
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                onChange={this.collectDate}
                id={series.idLoad}
                type="number"
                bsPrefix={el.name}
              />
            </InputGroup>
            <InputGroup
              className="inputWrapContainerMobile"
              id={series.key}
              size="sm"
            >
              <FormControl
                placeholder="Powtórzenia"
                onChange={this.collectDate}
                id={series.idRepeat}
                type="number"
                bsPrefix={el.name}
              />
              <FormControl
                placeholder="Obciążenie"
                onChange={this.collectDate}
                id={series.idLoad}
                type="number"
                bsPrefix={el.name}
              />
            </InputGroup>
          </td>
        ))}
      </tr>
    );
  };

  render() {
    return (
      <div className="todayTraining">
        {this.state.showDisabledLayer ? (
          <div className="disabledLayer" />
        ) : null}
        <Dropdown className="todayTraining__chooseDropdown">
          <Dropdown.Toggle size="lg" variant="info" id="choosePlan">
            Wybierz plan treningowy
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {this.state.trainings
              ? this.state.trainings.map(this.showPlanToChoose)
              : null}
          </Dropdown.Menu>
        </Dropdown>
        {this.state.showTable ? (
          <div className="todayTraining__trainingTable">
            <Table striped bordered hover variant="dark">
              <thead className="todayTraining__trainingTable__header">
                <tr>
                  <td>Nazwa ćwiczenia</td>
                  <td>Seria 1</td>
                  <td>Seria 2</td>
                  <td>Seria 3</td>
                  <td>Seria 4</td>
                  <td>Seria 5</td>
                </tr>
              </thead>
              <tbody>{this.state.exercises.map(this.renderExercises)}</tbody>
            </Table>
          </div>
        ) : null}
        {this.state.showSave ? (
          <Button
            className="todayTraining__saveBtn"
            onClick={this.sendToDataBase}
            variant="primary"
            size="lg"
          >
            Zapisz trening
          </Button>
        ) : null}
        {this.state.showSuccessPopUp ? (
          <CustomAlert
            header={this.alertText.success.header}
            desc={this.alertText.success.desc}
            close={this.closeSuccessPopUp}
            goTo1Text={this.alertText.goTo1.text}
            goTo1Link={this.alertText.goTo1.link}
            extraFunc={this.showOffDisabledLayer}
          />
        ) : null}
        {this.state.showFalsePopUp ? (
          <CustomAlert
            header={this.alertText.fail.header}
            desc={this.alertText.fail.desc}
            close={this.closeFalsePopUp}
          />
        ) : null}
      </div>
    );
  }
}
