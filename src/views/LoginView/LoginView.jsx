import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";

export default class RegisterView extends Component {
  render() {
    return (
      <div>
        <Button variant="warning">
          <Link to="/">Powrót do strony głównej</Link>
        </Button>
        <LoginForm />
      </div>
    );
  }
}
