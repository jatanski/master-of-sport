import React, { Component } from "react";
import "./mainView.scss";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class MainView extends Component {
  deleteToken() {
    localStorage.removeItem("x-auth-token");
  }
  render() {
    return (
      <section className="mainView">
        <p>Zalogowałeś się pomyślnie.</p>
        <p>Tutaj jest główne Menu</p>
        <Button variant="warning" onClick={this.deleteToken}>
          <Link to="/">Wyloguj się!</Link>
        </Button>
      </section>
    );
  }
}
