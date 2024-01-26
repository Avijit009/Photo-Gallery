import React from "react";
import "./header.css";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const Header = (props) => {
  let links = null;
  if (props.token === null) {
    links = (
      <Nav className="mr-md-5">
        <NavItem>
          <NavLink className="NavLink" to="/signup">
            Sign Up / Sign In
          </NavLink>
        </NavItem>
      </Nav>
    );
  } else {
    links = (
      <Nav className="mr-md-5">
        <NavItem>
          <NavLink className="NavLink" to="/">
            Burger Builder
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="NavLink" to="/orders">
            Orders
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="NavLink" to="/signout">
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
          backgroundColor: "#D70F64",
          height: "70px",
        }}
      >
        <NavbarBrand href="/" className="mr-auto ml-md-5 Brand">
          {/* Using logo from public/assets */}
          <img src="assets/logo.jpeg" alt="Logo" width={80} />
        </NavbarBrand>

        {links}
      </Navbar>
    </div>
  );
};

export default connect(mapStateToProps)(Header);
