import * as actionTypes from './actionTypes';
import {FIREBASE_API_KEY} from '../../constants';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
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
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            })
            .catch(err => {
                console.log(err.response.data.error.message);
            });
    };
};