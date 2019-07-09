import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

export default class RegisterForm extends Component {
  state = {
    formEmailValue: "",
    formNameValue: "",
    formPasswordValue: ""
  };

  handleInputChange = e => {
    const state = {};
    state[`${e.target.id}Value`] = e.target.value;
    this.setState(state);
  };

  submitRegister = async e => {
    e.preventDefault();
    const requestBody = {
      name: this.state.formNameValue,
      email: this.state.formEmailValue,
      password: this.state.formPasswordValue
    };

    try {
      let response = await fetch("/register", {
        method: "post",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(requestBody)
      });
      if (response.status !== 200) throw response;
      localStorage.setItem(
        "x-auth-token",
        response.headers.get("x-auth-token")
      );
      response = await response.json();
      this.props.changeView();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div>
        <Form className="registerView__form">
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
