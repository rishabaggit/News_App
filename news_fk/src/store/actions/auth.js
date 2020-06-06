import * as actionTypes from './actionTypes';
import {FIREBASE_API_KEY} from '../../constants';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId
    };
};
export const authRedirectToggle = (tog) => {
    return {
        type: actionTypes.AUTH_REDIRECT_TOGGLE,
        redirect_after_login : tog
    };
};
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const auth = (email, password, type) => {
    return (dispatch, getState) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let type_ = type === 'signIn' ? 'signInWithPassword' : 'signUp';
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:${type_}?key=${FIREBASE_API_KEY}`;

        axios.post(url, authData)
            .then(response => {
                dispatch(authSuccess(email));
            })
            .catch(err => {
                console.log(err.response.data.error.message);
            });
    };
};