import * as actionTypes from "./actionTypes";
import axios from "axios";
import { getDatabase, ref, set } from "firebase/database";


export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId,
        },
    };
};

export const authLoading = (isLoading) => {
    return {
        type: actionTypes.AUTH_LOADING,
        payload: isLoading,
    };
};

// Firbase authentication Failed
export const authFailed = (errMsg) => {
    return {
        type: actionTypes.AUTH_FAILED,
        payload: errMsg,
    };
};

export const auth = (username, email, password, mode) => (dispatch) => {
    dispatch(authLoading(true)); // true will pass as payLoad

    const authData = {
        username: username,
        email: email,
        password: password,
        returnSecureToken: true, // for firebase structure
    };

    let authUrl = null;
    if (mode === "Sign Up") {
        authUrl =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    } else {
        authUrl =
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    }

    let error = false;
    const API_KEY = "AIzaSyBsVvHqRLQsmQDFZHCey9N2vD0ILMMuXjU";
    axios
        .post(authUrl + API_KEY, authData)
        .then((response) => {
            dispatch(authLoading(false));
            localStorage.setItem("token", response.data.idToken);
            localStorage.setItem("userId", response.data.localId);

            const expirationTime = new Date(
                new Date().getTime() + response.data.expiresIn * 2000
            );
            localStorage.setItem("expirationTime", expirationTime);

            dispatch(authSuccess(response.data.idToken, response.data.localId));
        })
        .catch((err) => {
            dispatch(authLoading(false));
            dispatch(authFailed(err.response.data.error.message));
            error = true;
        });

    //store in credentials table
    if (error === false && mode === "Sign Up") {
        const db = getDatabase();
        var seconds = new Date().getTime();
        set(ref(db, "Credentials/" + seconds), {
            email: email,
        });
    }

    // set email to local storage
    localStorage.setItem("email", email);
};

//auto logout actions for auth token
export const signout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");

    return {
        type: actionTypes.AUTH_SIGNOUT,
    };
};

// it will call after loading the main
export const authCheck = () => (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
        //If token time expire
        dispatch(signout());
    } else {
        
        const expirationTime = new Date(localStorage.getItem("expirationTime"));

        
        if (expirationTime <= new Date()) {
            //logout
            dispatch(signout());
        } else {
            const userId = localStorage.getItem("userId");
            dispatch(authSuccess(token, userId));
        }
    }
};