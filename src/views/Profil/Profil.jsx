import React, { Component } from "react";
import { Jumbotron, Form, Button } from "react-bootstrap";
import CustomAlert from "../../components/Alert/Alert";
import "./profil.scss";

export default class Profil extends Component {
  state = {
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: "",
    showUnequalPassword: false,
    showEqualPassword: false,
    disabledChangeButton: true
  };

  alertText = {
    success: {
      header: "Hasło zostało pomyślnie zmienione.",
      desc: ""
    },
    fail: {
      header: "Podałeś źle hasło aktualne.",
      desc: "Spróbuj jeszcze raz."
    },
    goTo1: {
      text: "Okej"
    }
  };

  password = {};

  changePassword = async () => {
    const token = localStorage.getItem("x-auth-token");
    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-auth-token": token
    };
    const requestBody = {
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword
    };

    try {
      let response = await fetch("/register", {
        method: "put",
        headers: requestHeaders,
        body: JSON.stringify(requestBody)
      });
      if (response.status === 400) {
        this.setState({ showFalsePopUp: true });
      }
      if (response.status !== 200) throw response;
      response = await response.json();
      this.setState({ showSuccessPopUp: true });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  cleanForm = () => {
    this.setState({
      oldPassword: "",
      newPassword: "",
      repeatNewPassword: "",
      showUnequalPassword: false,
      showEqualPassword: false,
      disabledChangeButton: true
    });
  };

  closeFalsePopUp = () => this.setState({ showFalsePopUp: false });

  closeSuccessPopUp = () => this.setState({ showSuccessPopUp: false });

  handleInputChange = e => {
    const state = {};
    state[`${e.target.id}`] = e.target.value;
    this.password[`${e.target.id}`] = e.target.value;
    this.setState(state);

    // show info about unequal new and repeat password
    if (this.password.repeatNewPassword !== this.password.newPassword) {
      this.setState({ showUnequalPassword: true, disabledChangeButton: true });
    } else if (
      this.password.repeatNewPassword === this.password.newPassword &&
      this.password.newPassword !== ""
    ) {
      this.setState({
        showUnequalPassword: false,
        disabledChangeButton: false
      });
    }
    // show info about equal old and new password
    if (this.password.newPassword === this.password.oldPassword) {
      this.setState({ showEqualPassword: true, disabledChangeButton: true });
    } else if (
      this.password.newPassword !== this.password.oldPassword &&
      this.password.newPassword !== ""
    ) {
      this.setState({
        showEqualPassword: false,
        disabledChangeButton: false
      });
    }
  };

  render() {
    return (
      <section className="profil">
        <Jumbotron>
          <div className="calculatorCalories__instruction">
            <h2 className="calculatorCalories__header-main">Mój profil</h2>
            <p>
              Możesz tutaj zmienić swoje hasło albo zrobić coś innego. <br />
              <br />
              Pamiętaj, że hasło musi zawierać minimum 8 znaków.
            </p>
            <h3 className="calculatorCalories__header-secondary">
              Zmień hasło
            </h3>
            <Form>
              <Form.Group controlId="oldPassword">
                <Form.Label>Aktualne hasło</Form.Label>
                <Form.Control
                  onChange={this.handleInputChange}
                  type="password"
                  placeholder="Wpisz aktualne hasło..."
                  value={this.state.oldPassword}
                />
              </Form.Group>
              <Form.Group controlId="newPassword">
                <Form.Label>Nowe hasło</Form.Label>
                <Form.Control
                  onChange={this.handleInputChange}
                  type="password"
                  placeholder="Wpisz nowe hasło..."
                  value={this.state.newPassword}
                />
              </Form.Group>
              <Form.Group controlId="repeatNewPassword">
                <Form.Label>Powtórz nowe hasło</Form.Label>
                <Form.Control
                  onChange={this.handleInputChange}
                  type="password"
                  placeholder="Powtórz nowe hasło..."
                  value={this.state.repeatNewPassword}
                />
                {this.state.showUnequalPassword ? (
                  <Form.Text className="profil__info">
                    {" "}
                    Hasła nie są takie same.
                  </Form.Text>
                ) : null}
                {this.state.showEqualPassword ? (
                  <Form.Text className="profil__info">
                    {" "}
                    Nowe hasło musi się różnić od aktualnego.
                  </Form.Text>
                ) : null}
              </Form.Group>
              <Button
                disabled={this.state.disabledChangeButton}
                onClick={this.changePassword}
                variant="success"
              >
                Zmień hasło
              </Button>
            </Form>
          </div>
        </Jumbotron>
        {this.state.showSuccessPopUp ? (
          <CustomAlert
            header={this.alertText.success.header}
            desc={this.alertText.success.desc}
            close={this.closeSuccessPopUp}
            goTo1Text={this.alertText.goTo1.text}
            extraFunc={this.cleanForm}
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
