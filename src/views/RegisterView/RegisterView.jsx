import React, { Component } from "react";
import { Button, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { allActions } from "../../redux/store";
import "./registerView.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBiking,
  faSwimmer,
  faRunning,
  faSnowboarding
} from "@fortawesome/free-solid-svg-icons";

export default class RegisterView extends Component {
  changeViewAfterRegister = () => {
    this.props.history.push(`/me`);
    allActions.login();
  };

  render() {
    return (
      <section className="registerView">
        <div className="registerView__decoration">
          <FontAwesomeIcon
            icon={faRunning}
            className="registerView__decoration__ico-1"
          />
          <FontAwesomeIcon
            icon={faBiking}
            className="registerView__decoration__ico-2"
          />
          <FontAwesomeIcon
            icon={faSwimmer}
            className="registerView__decoration__ico-3"
          />
          <FontAwesomeIcon
            icon={faSnowboarding}
            className="registerView__decoration__ico-4"
          />
        </div>
        <Jumbotron className="registerView__jumbotron">
          <Button className="registerView__backBtn" variant="warning">
            <Link to="/">Powrót do strony głównej</Link>
          </Button>
          <RegisterForm changeView={this.changeViewAfterRegister} />
        </Jumbotron>
      </section>
    );
  }
}
