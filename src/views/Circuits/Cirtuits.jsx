import React, { Component } from "react";
import "./circuits.scss";
import { Form, Button } from "react-bootstrap";
import CustomAlert from "../../components/Alert/Alert";

export default class Circuits extends Component {
  state = {
    weight: 0,
    calf: 0,
    thigh: 0,
    rear: 0,
    waist: 0,
    chest: 0,
    biceps: 0,
    forearm: 0,
    showFalsePopUp: false,
    showSuccessPopUp: false
  };

  alertText = {
    success: {
      header: "Twoje pomiary zostały dodane.",
      desc:
        "Możesz teraz przejrzeć swoje statystyki. Albo zrobić coś innego. Wybór należy do Ciebie."
    },
    fail: {
      header: "Dodałeś już dzisiaj swoje pomiary.",
      desc: "Spróbuj ponownie jutro."
    }
  };

  closeFalsePopUp = () => this.setState({ showFalsePopUp: false });
  closeSuccessPopUp = () => this.setState({ showSuccessPopUp: false });

  collectData = e => {
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
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    console.log(this.state);
    return (
      <section className="circuits">
        <h1>Wprowadź swoje pomiary</h1>
        <Form>
          <Form.Group onChange={this.collectData} controlId="weight">
            <Form.Label>Wprowadź swoją wagę</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Label>Wprowadź swoje wymiary:</Form.Label>
          <Form.Group onChange={this.collectData} controlId="calf">
            <Form.Label>Łydka:</Form.Label>
            <Form.Control />
          </Form.Group>
          <Form.Group onChange={this.collectData} controlId="thigh">
            <Form.Label>Udo:</Form.Label>
            <Form.Control />
          </Form.Group>
          <Form.Group onChange={this.collectData} controlId="rear">
            <Form.Label>Pas:</Form.Label>
            <Form.Control />
          </Form.Group>
          <Form.Group onChange={this.collectData} controlId="waist">
            <Form.Label>Talia:</Form.Label>
            <Form.Control />
          </Form.Group>
          <Form.Group onChange={this.collectData} controlId="chest">
            <Form.Label>Klatka:</Form.Label>
            <Form.Control />
          </Form.Group>
          <Form.Group onChange={this.collectData} controlId="biceps">
            <Form.Label>Biceps:</Form.Label>
            <Form.Control />
          </Form.Group>
          <Form.Group onChange={this.collectData} controlId="forearm">
            <Form.Label>Przedramię:</Form.Label>
            <Form.Control />
          </Form.Group>
          <Button onClick={this.saveCircuits} size="lg" variant="primary">
            Zapisz
          </Button>
        </Form>
        {this.state.showSuccessPopUp ? (
          <CustomAlert
            header={this.alertText.success.header}
            desc={this.alertText.success.desc}
            close={this.closeSuccessPopUp}
            goToStatistics="true"
          />
        ) : null}
        {this.state.showFalsePopUp ? (
          <CustomAlert
            header={this.alertText.fail.header}
            desc={this.alertText.fail.desc}
            close={this.closeFalsePopUp}
          />
        ) : null}
      </section>
    );
  }
}
