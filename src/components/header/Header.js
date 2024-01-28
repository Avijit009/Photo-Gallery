import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    // firebase login/signup token for auto login
    token: state.token,
  };
};

const Header = (props) => {
  let links = null;
  if (props.token === null) {
    // means not authenticated
    links = (
      <Nav className="mr-md-5">
        <NavItem>
          <NavLink to="/signup" className="NavLink">
            Sign In / Sign Up
          </NavLink>
        </NavItem>
      </Nav>
    );
  } else {
    links = (
      <Nav className="mr-md-5">
        <NavItem>
          <NavLink to="/" className="NavLink">
            Gallery
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/gallery" className="NavLink">
            Photo Category
          </NavLink>
        </NavItem>
        <NavItem className="ml-auto">
          <NavLink to="/signout" className="NavLink">
            Sign Out
          </NavLink>
        </NavItem>
      </Nav>
    );
  }
  return (
    <div className="Navigation">
      <Navbar
        style={{
          backgroundColor: "#001a13",
          height: "70px",
        }}
      >
        <NavbarBrand href="/" className="mr-auto ml-md-5 Brand">
          {/* Using logo from public/assets */}
          <img src="assets/logo.png" alt="Logo" width={80} />
        </NavbarBrand>
        {links}
      </Navbar>
    </div>
  );
};

export default connect(mapStateToProps)(Header);
