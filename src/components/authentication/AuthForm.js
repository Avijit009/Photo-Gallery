import React, { Component } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { Alert } from "reactstrap";

import { auth } from "../../redux/authActionCreators";
import Spinner from '../spinner/Spinner';

// dispatch to authActionCreators
const mapDispatchToProps = (dispatch) => {
    return {
        auth: (username, email, password, mode) =>
            dispatch(auth(username, email, password, mode)),
    };
};

const mapStateToProps = (state) => {
    return {
        authLoading: state.authLoading,
        authFailedMsg: state.authFailedMsg,
    };
};

class AuthForm extends Component {
    //same form for login and sign up
    state = {
        mode: "Sign Up",
    };

    switchModeHandler = () => {
        this.setState({
            mode: this.state.mode === "Sign Up" ? "Sign In" : "Sign Up",
        });
    };
    render() {
        let error = null;
        if (this.props.authFailedMsg !== null) {
            error = <Alert color="danger">{this.props.authFailedMsg}</Alert>;
        }

        let form = null;
        if (this.props.authLoading) {
            form = <Spinner />;
        } else {
            form = (
                <Formik
                    initialValues={
                        // j field gulo thakbe auth page e
                        {
                            username: "",
                            email: "",
                            password: "",
                            passwordConfirm: "",
                        }
                    }
                    onSubmit={(values) => {
                        this.props.auth(
                            values.username,
                            values.email,
                            values.password,
                            this.state.mode
                        );
                    }}
                    //==================== validation ==================//
                    // for validation, built in props
                    // validation check failed hole r shamne agabe na
                    validate={(values) => {
                        const errors = {};
                        if (this.state.mode === "Sign Up") {
                            if (!values.username) {
                                errors.username = "Required";
                            }
                        }
                        // empty kina
                        if (!values.email) {
                            errors.email = "Required";
                        }
                        // email adds invalid kina
                        else if (
                            !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(
                                values.email
                            )
                        ) {
                            errors.email = "Invalid email address";
                        }

                        //password
                        if (!values.password) {
                            errors.password = "Required";
                        } else if (values.password.length < 4) {
                            errors.password =
                                "Password must be at least 4 characters!";
                        }

                        // pass confirm
                        if (this.state.mode === "Sign Up") {
                            if (!values.passwordConfirm) {
                                errors.passwordConfirm = "Required";
                            } else if (
                                values.password !== values.passwordConfirm
                            ) {
                                errors.passwordConfirm =
                                    "Password field does not match";
                            }
                        }

                        //console.log("Errors",errors);
                        return errors;
                    }}
                >
                    {/* ei fn er vitor form render kora hbe */}
                    {/* handleChange built in formik fn, er maddhome field er value auto form e upate hy */}
                    {/* handleSubmit o built in fn */}
                    {/* errors => to show errors under field input */}
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <div
                            style={{
                                border: "1px grey solid",
                                padding: "30px",
                                borderRadius: "7px",
                            }}
                        >
                            {/* switch to login/signUp */}
                            <button
                                className="btn btn-lg"
                                style={{
                                    width: "100%",
                                    backgroundColor: "#001a13",
                                    color: "white",
                                }}
                                onClick={this.switchModeHandler}
                            >
                                Switch to{" "}
                                {this.state.mode === "Sign Up"
                                    ? "Sign In"
                                    : "Sign Up"}
                            </button>
                            <br />
                            <br />
                            <form onSubmit={handleSubmit}>
                                {/* field "name" will be same as initialValues field_names */}
                                {this.state.mode === "Sign Up" ? (
                                    <div>
                                        <input
                                            name="username"
                                            placeholder="Enter Your Name"
                                            className="form-control"
                                            value={values.username}
                                            onChange={handleChange}
                                        />
                                        <span style={{ color: "red" }}>
                                            {errors.username}
                                        </span>

                                        <br />
                                    </div>
                                ) : null}

                                <input
                                    name="email"
                                    placeholder="Enter Your Email"
                                    className="form-control"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <span style={{ color: "red" }}>
                                    {errors.email}
                                </span>

                                <br />

                                <input
                                    name="password"
                                    placeholder="Password"
                                    className="form-control"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <span style={{ color: "red" }}>
                                    {errors.password}
                                </span>

                                <br />
                                {/* mode=="Sign Up" hole ei part dekhabe, nahole kisuna(null) dekhabe */}
                                {this.state.mode === "Sign Up" ? (
                                    <div>
                                        <input
                                            name="passwordConfirm"
                                            placeholder="Confirm Password"
                                            className="form-control"
                                            value={values.passwordConfirm}
                                            onChange={handleChange}
                                        />
                                        <span style={{ color: "red" }}>
                                            {errors.passwordConfirm}
                                        </span>

                                        <br />
                                    </div>
                                ) : null}

                                <button
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    {this.state.mode === "Sign Up"
                                        ? "Sign Up"
                                        : "Sign In"}
                                </button>
                            </form>
                        </div>
                    )}
                </Formik>
            );
        }

        return (
            <div>
                {error}
                {form}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
