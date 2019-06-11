import React, { Component } from "react";
import "./menuDesktop.scss";
import { Navbar, Nav, Button, Form, FormControl } from "react-bootstrap";
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
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">
            <Link to="/me">Master of Calories</Link>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link to="/calculator">
              <Link to="/calculator">Kalkulator kalorii</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/bmi">Kalkulator BMI</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/myplans">Moje plany</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/statistics">Statystyki</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="circuits">Obwody</Link>
            </Nav.Link>
            <Nav.Link href="#features">Settings</Nav.Link>
            <Nav.Link href="#pricing">Profil</Nav.Link>
            <Button variant="outline-light" onClick={this.logout}>
              <Link to="/">Wyloguj się!</Link>
            </Button>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar>
      </div>
    );
  }
}
