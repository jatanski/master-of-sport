import React, { Component } from "react";
import { Button, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./loginView.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFutbol,
  faBasketballBall,
  faVolleyballBall,
  faFootballBall
} from "@fortawesome/free-solid-svg-icons";

export default class RegisterView extends Component {
  changeViewAfterLogin = () => {
    this.props.history.push(`/me`);
  };
  render() {
    return (
      <section className="registerView">
        <div className="registerView__decoration">
          <FontAwesomeIcon
            icon={faVolleyballBall}
            className="registerView__decoration__ico-1"
          />
          <FontAwesomeIcon
            icon={faFutbol}
            className="registerView__decoration__ico-2"
          />
          <FontAwesomeIcon
            icon={faBasketballBall}
            className="registerView__decoration__ico-3"
          />
          <FontAwesomeIcon
            icon={faFootballBall}
            className="registerView__decoration__ico-4"
          />
        </div>
        <Jumbotron className="registerView__jumbotron">
          <Button className="registerView__backBtn" variant="warning">
            <Link to="/">Powrót do strony głównej</Link>
          </Button>
          <LoginForm changeView={this.changeViewAfterLogin} />
        </Jumbotron>
      </section>
    );
  }
}
