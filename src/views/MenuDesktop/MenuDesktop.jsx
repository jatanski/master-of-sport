import React, { Component } from "react";
import "./menuDesktop.scss";
import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import { allActions } from "../../redux/store";
import { Link } from "react-router-dom";

export default class MenuDesktop extends Component {
  logout() {
    localStorage.removeItem("x-auth-token");
    allActions.logout();
  }
  render() {
    return (
      <div className="menuDesktop">
        <Navbar expand="lg" bg="dark" variant="dark">
          <Navbar.Brand>
            <Link className="menuDesktop__link" to="/me">
              Master of Calories
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Dodaj plan">
                <NavDropdown.Item>
                  <Link to="/workoutplans">Treningowy</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/calculator">Dietetyczny</Link>
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Item>
                <Link className="menuDesktop__link" to="/statistics">
                  Statystyki
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="menuDesktop__link" to="/circuits">
                  Obwody
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="menuDesktop__link" to="/diary">
                  Dodaj treninig
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="menuDesktop__link" to="/menus">
                  Dodaj Jadłospis
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="menuDesktop__link" to="/bmi">
                  Sprawdź swoje BMI
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="menuDesktop__link" to="/myplans">
                  Moje Plany
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="menuDesktop__link" to="/profil">
                  Profil
                </Link>
              </Nav.Item>
            </Nav>
            <Nav>
              <Button variant="outline-light" onClick={this.logout}>
                <Link to="/">Wyloguj się!</Link>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
