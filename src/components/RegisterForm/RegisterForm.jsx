import React, { Component } from "react";
import "./registerForm.scss";
import { Form, Button } from "react-bootstrap";

export default class RegisterForm extends Component {
  state = {
    formNameValue: "",
    formEmailValue: "",
    formPasswordValue: ""
  };

  handleInputChange = e => {
    const state = {};
    state[`${e.target.id}Value`] = e.target.value;
    this.setState(state);
  };

  submitRegister = async e => {
    e.preventDefault();
    const requestBody = {};
    requestBody.name = this.state.formNameValue;
    requestBody.email = this.state.formEmailValue;
    requestBody.password = this.state.formPasswordValue;

    try {
      let response = await fetch("/register", {
        method: "post",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(requestBody)
      });
      if (response.status !== 200) throw response;
      //   localStorage.setItem(
      //     "x-auth-token",
      //     response.headers.get("x-auth-token")
      //   );
      //   this.props.loginStatus(true);
      response = await response.json();
      console.log(response);
      this.props.changeView();
    } catch (err) {
      console.log(err);
      //   if ([404, 400].includes(err.status)) {
      //     let error = "Konto o podanym adresie email już istnieje";
      //     this.setState({
      //       name: "",
      //       email: "",
      //       password: "",
      //       type: "student",
      //       isDisable: true,
      //       errors: {
      //         email: error
      //       }
      //     });
    }
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Imię:</Form.Label>
            <Form.Control
              onChange={this.handleInputChange}
              value={this.state.formNameValue}
              type="name"
              placeholder="Podaj swoje imię"
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Adres E-mail:</Form.Label>
            <Form.Control
              onChange={this.handleInputChange}
              type="email"
              placeholder="Tutaj wpisz swój adres email"
              value={this.state.formEmailValue}
            />
            <Form.Text className="text-muted">
              Nikomu nie udostępnimy Twojego adresu email.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Hasło:</Form.Label>
            <Form.Control
              onChange={this.handleInputChange}
              type="password"
              placeholder="A tutaj hasło"
              value={this.state.formPasswordValue}
            />
          </Form.Group>
          <Button variant="success" type="submit" onClick={this.submitRegister}>
            Zarejestruj się
          </Button>
        </Form>
      </div>
    );
  }
}
