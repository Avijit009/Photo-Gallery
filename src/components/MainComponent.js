import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";

import { authCheck } from "../redux/authActionCreators";
import Header from "./header/Header";
import Homepage from "./body/Homepage";
import AuthForm from "./authentication/AuthForm";
import SignOut from "./authentication/SignOut";
import Gallery from "./body/Gallery";
import EachGallery from "./body/EachGallery";
import Feedback from "./body/feedback/Feedback";
import Footer from "./body/footer/Footer";

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authCheck: () => dispatch(authCheck()),
  };
};

class MainComponent extends Component {
  componentDidMount() {
    this.props.authCheck();
  }

  render() {
    let routes = null;
    // user not authenticated
    if (this.props.token === null) {
      routes = (
        <Routes>
          <Route path="/signup" element={<AuthForm />} />
          <Route path="*" element={<Navigate to="/signup" replace />} />
        </Routes>
      );
    } else {
      routes = (
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/each-gallery/:categoryName" element={<EachGallery />} />
          <Route path="/feedback/:from/:photo_id" element={<Feedback />} />
          <Route path="*" element={<Navigate to="/"  />} />
        </Routes>
      );
    }
    return (
      <div>
        <Header />
        <div className="container">{routes}</div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
