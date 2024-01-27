import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";


import Header from "./header/Header";
import AuthForm from "./authentication/AuthForm";
import SignOut from "./authentication/SignOut";
import { authCheck } from "../redux/authActionCreators";
import Homepage from "./body/Homepage";
import SingleAlbum from "./body/SingleAlbum";
import Feedback from "./body/feedback/Feedback";
import Gallery from "./body/Gallery";



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
        //  check j login token diye auto login korte parbe kina
        this.props.authCheck();
    }

    render() {
        let routes = null;
        // user not authenticated
        if (this.props.token === null) {
            routes = (
                <Routes>
                    <Route path="/signup" element={<AuthForm />} />
                    {/* kono kisur sathe match na hole login */}
                    <Route
                        path="*"
                        element={<Navigate to="/signup" replace />}
                    />
                </Routes>
            );
        } else {
            routes = (
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/signout" element={<SignOut />} />
                    <Route path="/gallery" element={<Gallery />} />
                    {/* dynamic param :categoryName */}
                    <Route
                        path="/single-album/:categoryName"
                        element={<SingleAlbum />}
                    />

                    <Route
                        path="/feedback/:came_from/:picture_id"
                        element={<Feedback />}
                    />
                    {/* kono kisur sathe match na hole "/" */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            );
        }
        return (
            <div>
                <Header />

                {/* container class left right kisu padding dey */}
                <div className="container">{routes}</div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);