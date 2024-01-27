import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { signout } from "../../redux/authActionCreators";

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(signout()),
    };
};

class SignOut extends Component {

    componentDidMount() {
        this.props.logout();
    }

    // It will navigate to homepage
    render() {
        return <Navigate to="/" replace />;
    }
}

export default connect(null, mapDispatchToProps)(SignOut);