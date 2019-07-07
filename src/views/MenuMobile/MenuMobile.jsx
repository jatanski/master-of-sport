import React, { Component } from "react";
import "./menuMobile.scss";
import { allActions } from "../../redux/store";
import { Link } from "react-router-dom";

import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBCollapse,
  MDBContainer,
  MDBHamburgerToggler,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  Button
} from "mdbreact";

export default class MenuMobile extends Component {
  state = {
    collapse1: false,
    collapseID: ""
  };

  logout() {
    localStorage.removeItem("x-auth-token");
    allActions.logout();
  }

  toggleCollapse = collapseID => () => {
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));
  };

  toggleSingleCollapse = collapseId => {
    this.setState({
      ...this.state,
      [collapseId]: !this.state[collapseId]
    });
  };

  render() {
    return (
      <section className="menuMobile">
        <MDBContainer>
          <MDBNavbar color="primary-color" light>
            <MDBContainer>
              <MDBNavbarBrand>
                <strong className="white-text">
                  <Link className="linkMyStyle" to="/me">
                    Master of Sportsman
                  </Link>
                </strong>
              </MDBNavbarBrand>
              <MDBHamburgerToggler
                color="white"
                id="hamburger1"
                onClick={() => this.toggleSingleCollapse("collapse1")}
              />
              <MDBCollapse isOpen={this.state.collapse1} navbar>
                <MDBNavbarNav left>
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <div className="d-none d-md-inline">Dieta</div>
                      </MDBDropdownToggle>
                      <MDBDropdownMenu className="dropdown-default">
                        <MDBDropdownItem>
                          <MDBNavLink
                            className="linkMyStyle-black"
                            to="/calculator"
                          >
                            Nowy plan dietetyczny
                          </MDBNavLink>
                        </MDBDropdownItem>
                        <MDBDropdownItem>
                          <MDBNavLink className="linkMyStyle-black" to="/menus">
                            Dzisiejszy jadłospis
                          </MDBNavLink>
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <div className="d-none d-md-inline">Trening</div>
                      </MDBDropdownToggle>
                      <MDBDropdownMenu className="dropdown-default">
                        <MDBDropdownItem>
                          <MDBNavLink
                            className="linkMyStyle-black"
                            to="/workoutplans"
                          >
                            Nowy plan treningowy
                          </MDBNavLink>
                        </MDBDropdownItem>
                        <MDBDropdownItem>
                          <MDBNavLink
                            className="linkMyStyle-black"
                            to="/myplans"
                          >
                            Istniejące plany
                          </MDBNavLink>
                        </MDBDropdownItem>
                        <MDBDropdownItem>
                          <MDBNavLink className="linkMyStyle-black" to="/diary">
                            Dodaj dzisiejszy trening
                          </MDBNavLink>
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/statistics">Statystyki</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/circuits">Obwody</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/bmi">Sprawdź BMI</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink className="linkMyStyle-black" to="/profil">
                      Profil
                    </MDBNavLink>
                  </MDBNavItem>
                  <Button className="menuMobile__logoutBtn" color="indigo">
                    <Link onClick={this.logout} to="/">
                      Wyloguj się
                    </Link>
                  </Button>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>
        </MDBContainer>
      </section>
    );
  }
}
