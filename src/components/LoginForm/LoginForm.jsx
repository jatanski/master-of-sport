import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { allActions } from "../../redux/store";

export default class RegisterForm extends Component {
  state = {
    formEmailValue: "",
    formPasswordValue: ""
  };

  handleInputChange = e => {
    const state = {};
    state[`${e.target.id}Value`] = e.target.value;
    this.setState(state);
  };

  submitLogin = async e => {
    e.preventDefault();
    const requestBody = {};
    requestBody.email = this.state.formEmailValue;
    requestBody.password = this.state.formPasswordValue;

    try {
      let response = await fetch("/login", {
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
      allActions.login();
      response = await response.json();
      this.props.changeView();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Adres E-mail:</Form.Label>
            <Form.Control
              onChange={this.handleInputChange}
              type="email"
              placeholder="Tutaj wpisz swój adres email"
              value={this.state.formEmailValue}
            />
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
          <Button variant="success" type="submit" onClick={this.submitLogin}>
            Zaloguj się
          </Button>
        </Form>
      </div>
    );
  }
}
