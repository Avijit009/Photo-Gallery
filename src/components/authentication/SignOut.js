// src\Components\Auth\Logout.js
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { signout } from "../../redux/authActionCreators";

const mapDispatchToProps = (dispatch) => {
    return {
        signout: () => dispatch(signout()),
    };
};

class SignOut extends Component {
    // logout hbe
    componentDidMount() {
        this.props.signout();
    }

    // redirect kore main link e niye jabe
    render() {
        return <Navigate to="/" replace />;
    }
}

export default connect(null, mapDispatchToProps)(SignOut);
