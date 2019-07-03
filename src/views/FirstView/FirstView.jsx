import React, { Component } from "react";
import { Button, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./firstView.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faWeight,
  faDumbbell,
  faRunning,
  faHandPaper,
  faUserEdit
} from "@fortawesome/free-solid-svg-icons";

export default class FirstView extends Component {
  render() {
    return (
      <section className="firstView">
        <div className="firstView__promotion">
          <span className="firstView__promotion__decoration">
            <FontAwesomeIcon
              icon={faRunning}
              className="firstView__promotion__decoration__ico"
            />
          </span>
          <div className="firstView__promotion__headerContainer">
            <h1 className="firstView__promotion__header">Master of Sportman</h1>
            <h2 className="firstView__promotion__headerDesc">
              {" "}
              Stwórz wreszcie swoją wymarzoną sylwetkę przy pomocy
              profesjonalnego dziennika treningowego.{" "}
            </h2>
          </div>
          <div className="firstView__promotion__description">
            <div className="firstView__promotion__description__textAndIco">
              <FontAwesomeIcon icon={faUtensils} className="firstView__ico" />
              <p className="firstView__promotion__description__text">
                Układaj oraz zapisuj swoje plany żywieniowe.
              </p>
            </div>
            <div className="firstView__promotion__description__textAndIco">
              <FontAwesomeIcon icon={faDumbbell} className="firstView__ico" />
              <p className="firstView__promotion__description__text">
                Twórz plany treningowe i monitoruj swój progres.
              </p>
            </div>
            <div className="firstView__promotion__description__textAndIco">
              <FontAwesomeIcon icon={faWeight} className="firstView__ico" />
              <p className="firstView__promotion__description__text">
                Zapisuj pomiary swojego ciała oraz wage i obserwuj jak Twoje
                cialo się zmienia!
              </p>
            </div>
          </div>
        </div>
        <div className="firstView__rejAndLog">
          <Jumbotron className="jumbotron-firstView">
            <div className="firstView__rejAndLog__desc">
              <FontAwesomeIcon
                icon={faUserEdit}
                className="firstView__rejAndLog__ico"
              />
              <h2 className="firstView__rejAndLog__desc__header">
                Nie marnuj czasu i zacznij już dzisiaj.
              </h2>
              <div className="firstView__rejAndLog__text">
                <p>
                  Rejestracja jest darmowa. Jeżeli posiadasz konto to po prostu
                  zaloguj się.
                </p>
              </div>
            </div>
            <div className="firstView__rejAndLog__buttons">
              <Button
                variant="primary"
                className="firstView__rejAndLog__registerButton button"
                size="lg"
              >
                <Link to="/register"> Zarejestruj się</Link>
              </Button>
              <Button
                variant="success"
                className="firstView__rejAndLog__loginButton button"
                size="lg"
              >
                <Link to="/login"> Zaloguj się</Link>
              </Button>
            </div>
          </Jumbotron>
        </div>
      </section>
    );
  }
}
