import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./firstView.scss";

export default class FirstView extends Component {
  render() {
    return (
      <section className="firstView">
        <Button
          variant="secondary"
          className="firstView__registerButton button"
        >
          <Link to="/register"> Zarejestruj się</Link>
        </Button>
        <Button variant="success" className="firstView__loginButton button">
          <Link to="/login"> Zaloguj się</Link>
        </Button>
      </section>
    );
  }
}
