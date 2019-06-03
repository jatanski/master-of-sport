import React, { Component } from "react";
import "./mainView.scss";
// import { Button } from "react-bootstrap";
// import { Link } from "react-router-dom";

export default class MainView extends Component {
  render() {
    return (
      <section className="mainView">
        <p>Zalogowałeś się pomyślnie.</p>
        <p>Tutaj jest główne Menu</p>
      </section>
    );
  }
}
