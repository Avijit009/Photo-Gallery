import React, { Component } from "react";
import { Formik } from "formik";
import { Alert } from "reactstrap";
import { connect } from "react-redux";

import { auth } from "../../redux/authActionCreators";
import Spinner from "../spinner/Spinner";

// Ditpatch to authActionCreators
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

//same form for login and sign up
class AuthForm extends Component {
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
          initialValues={{
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
          }}
          onSubmit={(values) => {
            this.props.auth(
              values.username,
              values.email,
              values.password,
              this.state.mode
            );
          }}
          //validation
          validate={(values) => {
            const errors = {};
            if (this.state.mode === "Sign Up") {
              if (!values.username) {
                errors.username = "Required";
              }
            }
            // Check if empty or not
            if (!values.email) {
              errors.email = "Required";
            }
            // email validation regex
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
              errors.password = "Password must be at least 4 characters!";
            }

            // pass confirm
            if (this.state.mode === "Sign Up") {
              if (!values.passwordConfirm) {
                errors.passwordConfirm = "Required";
              } else if (values.password !== values.passwordConfirm) {
                errors.passwordConfirm = "Password field does not match";
              }
            }

            //console.log("Errors",errors);
            return errors;
          }}
        >
          {({ values, handleChange, handleSubmit, errors }) => (
            <div
              style={{
                border: "1px grey solid",
                padding: "30px",
                borderRadius: "7px",
              }}
            >
              {/* switch to signin/signUp */}
              <button
                className="btn btn-lg"
                style={{
                  width: "100%",
                  backgroundColor: "#D70F64",
                  color: "white",
                }}
                onClick={this.switchModeHandler}
              >
                Switch to {" "}
                {this.state.mode === "Sign Up" ? "Sign In" : "Sign Up"}
              </button>
              <br />
              <br />
              <form onSubmit={handleSubmit}>
                {/* field "name" should same as initialValues field_names */}
                {this.state.mode === "Sign Up" ? (
                  <div>
                    <input
                      name="username"
                      placeholder="Enter Your Name"
                      className="form-control"
                      value={values.username}
                      onChange={handleChange}
                    />
                    <span style={{ color: "red" }}>{errors.username}</span>

                    <br />
                  </div>
                ) : null}

                <input
                  name="email"
                  placeholder="Enter Your Email"
                  className="form-control"
                  value={values.email}
                  onChange={handleChange}
                  type="email"
                />
                <span style={{ color: "red" }}>{errors.email}</span>

                <br />

                <input
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  value={values.password}
                  onChange={handleChange}
                  type="password"
                />
                <span style={{ color: "red" }}>{errors.password}</span>

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
                      type="password"
                    />
                    <span style={{ color: "red" }}>
                      {errors.passwordConfirm}
                    </span>

                    <br />
                  </div>
                ) : null}

                <button type="submit" className="btn btn-success">
                  {this.state.mode === "Sign Up" ? "Sign Up" : "Sign In"}
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
