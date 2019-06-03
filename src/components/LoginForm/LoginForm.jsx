import React, { Component } from "react";
import "./loginForm.scss";
import { Form, Button } from "react-bootstrap";

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
      //   localStorage.setItem(
      //     "x-auth-token",
      //     response.headers.get("x-auth-token")
      //   );
      //   this.props.loginStatus(true);
      response = await response.json();
      console.log(response);
      //   this.props.history.push(`/me`);
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
    console.log(this.state);
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
