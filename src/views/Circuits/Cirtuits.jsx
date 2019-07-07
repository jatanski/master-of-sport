import React, { Component } from "react";
import "./circuits.scss";
import { Form, Button, Jumbotron } from "react-bootstrap";
import CustomAlert from "../../components/Alert/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/Input/Input";

export default class Circuits extends Component {
  state = {
    disabledSavaPlan: true,
    weight: 0,
    calf: 0,
    thigh: 0,
    rear: 0,
    waist: 0,
    chest: 0,
    biceps: 0,
    forearm: 0,
    resetForm: false,
    showFalsePopUp: false,
    showSuccessPopUp: false
  };

  inputs = [
    { text: "Łydka", id: "calf", value: this.state.calf },
    { text: "Udo", id: "thigh", value: this.state.thigh },
    { text: "Pas", id: "rear", value: this.state.rear },
    { text: "Talia", id: "waist", value: this.state.waist },
    { text: "Klatka", id: "chest", value: this.state.chest },
    { text: "Biceps", id: "biceps", value: this.state.biceps },
    { text: "Przedramię", id: "forearm", value: this.state.forearm }
  ];

  alertText = {
    success: {
      header: "Twoje pomiary zostały dodane.",
      desc:
        "Możesz teraz przejrzeć wszystkie swoje pomiary w statystykach. Albo zrobić coś innego. Wybór należy do Ciebie."
    },
    fail: {
      header: "Dodałeś już dzisiaj swoje pomiary.",
      desc: "Spróbuj ponownie jutro."
    },
    goTo1: {
      text: "Statystyki",
      link: "/statistics"
    }
  };

  changeResetForm = () => this.setState({ resetForm: false });

  cleanForm = () => {
    this.setState({
      weight: 0,
      calf: 0,
      thigh: 0,
      rear: 0,
      waist: 0,
      chest: 0,
      biceps: 0,
      forearm: 0,
      resetForm: true
    });
  };

  closeFalsePopUp = () => this.setState({ showFalsePopUp: false });
  closeSuccessPopUp = () => this.setState({ showSuccessPopUp: false });

  collectData = e => {
    e.target.value > 0
      ? this.setState({ disabledSavaPlan: false })
      : this.setState({ disabledSavaPlan: true });
    const state = {};
    state[`${e.target.id}`] = Number(e.target.value);
    this.setState(state);
  };

  saveCircuits = async () => {
    const token = localStorage.getItem("x-auth-token");
    const now = `${new Date().getDate()}.${new Date().getMonth() +
      1}.${new Date().getFullYear()}`;
    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-auth-token": token
    };
    const requestBody = {
      date: now,
      weight: this.state.weight,
      circuits: {
        calf: this.state.calf,
        thigh: this.state.thigh,
        rear: this.state.rear,
        waist: this.state.waist,
        chest: this.state.chest,
        biceps: this.state.biceps,
        forearm: this.state.forearm
      }
    };
    try {
      let response = await fetch("/circuits", {
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
      this.cleanForm();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <section className="circuits">
        <Jumbotron className="jumbotron-circuits">
          <div className="calculatorCalories__instruction">
            <h2 className="calculatorCalories__header-main">
              Wprowadź swoje pomiary
            </h2>
            <p className="calculatorCalories__prop">
              Monitorowanie wagi oraz wymiarów poszczególnych części ciała, jest
              istotną częścią prowadzenia swojego planu
              treningowo-dietetycznego. <br /> Dzięki szczegółowym statystyką
              będziesz w stanie sprawdzić jak dana dieta i ćwiczenia wpływają na
              Twoją sylwetkę.
            </p>
            <h3 className="calculatorCalories__header-secondary">Instrukcja</h3>
            <p className="calculatorCalories__description">
              1. Uzupełpij wszystkie podane pola, a następnie kliknij{" "}
              <span className="bold">ZAPISZ PLAN</span>. <br /> 2. Zapisane
              pomiary możesz znaleźć w zakładce{" "}
              <span className="bold">STATYSTYKI</span> .
            </p>
          </div>
          <Form className="circuits__form">
            <Input
              text="Waga w kg"
              collectData={this.collectData}
              id="wight"
              value={this.state.weight}
              start={this.state.resetForm}
            />
            <Form.Label className="circuits__form__dimensions">
              Wymiary:
            </Form.Label>
            {this.inputs.map(el => {
              return (
                <Input
                  key={el.id}
                  text={el.text}
                  collectData={this.collectData}
                  id={el.id}
                  value={el.value}
                  start={this.state.resetForm}
                />
              );
            })}
            <Button
              disabled={this.state.disabledSavaPlan}
              onClick={this.saveCircuits}
              size="lg"
              variant="primary"
            >
              <span className="calculatorCalories__newMeal__text">
                Zapisz pomiary
              </span>
              <FontAwesomeIcon icon={faSave} />
            </Button>
          </Form>
          {this.state.showSuccessPopUp ? (
            <CustomAlert
              header={this.alertText.success.header}
              desc={this.alertText.success.desc}
              close={this.closeSuccessPopUp}
              goTo1Text={this.alertText.goTo1.text}
              goTo1Link={this.alertText.goTo1.link}
              extraFunc={this.changeResetForm}
            />
          ) : null}
          {this.state.showFalsePopUp ? (
            <CustomAlert
              header={this.alertText.fail.header}
              desc={this.alertText.fail.desc}
              close={this.closeFalsePopUp}
            />
          ) : null}
        </Jumbotron>
      </section>
    );
  }
}
