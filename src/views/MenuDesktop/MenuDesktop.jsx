import React, { Component } from "react";
import "./menuDesktop.scss";
import { allActions } from "../../redux/store";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
  Button
} from "mdbreact";

class MenuDesktop extends Component {
  state = { isOpen: false, showMenu: true };

  componentDidMount() {
    if (this.props.login) this.setState({ showMenu: true });
    else if (!this.props.login)
      this.setState({
        showMenu: false
      });

    const token = localStorage.getItem("x-auth-token");
    if (!token) {
      this.setState({ showMenu: false });
    }
  }

  componentDidUpdate = prevProps => {
    if (prevProps.login !== this.props.login) {
      if (this.props.login) this.setState({ showMenu: true });
      else if (!this.state.login) this.setState({ showMenu: false });
    }
  };

  logout() {
    localStorage.removeItem("x-auth-token");
    allActions.logout();
    this.setState({ showMenu: false });
  }
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div>
        {this.state.showMenu ? (
          <section className="menuDesktop">
            <MDBNavbar color="primary-color" dark expand="md">
              <MDBNavbarBrand>
                <strong className="white-text">
                  <Link className="linkMyStyle" to="/me">
                    Master of Sportsman
                  </Link>
                </strong>
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.toggleCollapse} />
              <MDBCollapse
                id="navbarCollapse3"
                isOpen={this.state.isOpen}
                navbar
              >
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
                </MDBNavbarNav>
                <MDBNavbarNav right>
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <MDBIcon icon="user" />
                      </MDBDropdownToggle>
                      <MDBDropdownMenu className="dropdown-default">
                        <MDBDropdownItem>
                          <MDBNavLink
                            className="linkMyStyle-black"
                            to="/profil"
                          >
                            Profil
                          </MDBNavLink>
                        </MDBDropdownItem>
                        <Button size="sm" variant="outline-light">
                          <Link onClick={this.logout} to="/">
                            Wyloguj się
                          </Link>
                        </Button>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                  <MDBNavItem>
                    <a
                      target="_blank"
                      className=" nav-link Ripple-parent waves-effect waves-light"
                      href="https://www.linkedin.com/in/jakub-tanski"
                    >
                      <MDBIcon fab icon="linkedin" />
                    </a>
                  </MDBNavItem>
                  <MDBNavItem>
                    <a
                      target="_blank"
                      className=" nav-link Ripple-parent waves-effect waves-light"
                      href="https://www.facebook.com/ja.tanski"
                    >
                      <MDBIcon fab icon="facebook" />
                    </a>
                  </MDBNavItem>
                  <MDBNavItem>
                    <a
                      target="_blank"
                      className=" nav-link Ripple-parent waves-effect waves-light"
                      href="https://github.com/jatanski/master-of-calories"
                    >
                      <MDBIcon fab icon="github" />
                    </a>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
          </section>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login.loginStatus
});

export default connect(
  mapStateToProps,
  {}
)(MenuDesktop);
