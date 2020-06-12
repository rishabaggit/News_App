import * as actionTypes from './actionTypes';
import { FIREBASE_API_KEY } from '../../constants';
import axios from 'axios';
import { app, facebookProvider } from '../../components/UserAuthentication/firebase'
import { newUser } from 'Util/FirestoreUtil';

interface authStartAction {
    type: typeof actionTypes.AUTH_START;
};

interface authSuccessAction {
    type: typeof actionTypes.AUTH_SUCCESS;
    userId: string;
};

interface authFailAction {
    type: typeof actionTypes.AUTH_FAIL;
    error: any;
};

interface logoutAction {
    type: typeof actionTypes.AUTH_LOGOUT;
};

interface authRefreshAction {
    type: typeof actionTypes.AUTH_REFRESH;
};

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (userId: string) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId
    };
};
export const authFail = (error: string) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};
export const authRefresh = () => {
    return {
        type: actionTypes.AUTH_REFRESH
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};
interface userDataInterface {
    email: string,
    password: string,
    fname: string,
    lname: string
}
export const authWithEmail = (userData: userDataInterface, SignIn: boolean) => {
    return (dispatch: any) => {
        dispatch(authStart());
        const authData = {
            email: userData.email,
            password: userData.password,
            returnSecureToken: true
        };
        const type = SignIn ? 'signInWithPassword' : 'signUp';
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:${type}?key=${FIREBASE_API_KEY}`;

        axios.post(url, authData)
            .then(response => {
                if (!SignIn) {
                    newUser(userData.email, userData.fname, userData.lname);
                }
                dispatch(authSuccess(userData.email));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error.message));
            });
    };
};


export const authWithFacebook = () => {
    return (dispatch: any) => {
        dispatch(authStart());
        interface ProfileInterface {
            email: string,
            first_name: string,
            last_name: string,
        }
        app.auth().signInWithPopup(facebookProvider)
            .then(result => {
                if (result.additionalUserInfo.isNewUser) {
                    newUser((result.additionalUserInfo.profile as ProfileInterface).email,
                        (result.additionalUserInfo.profile as ProfileInterface).first_name,
                        (result.additionalUserInfo.profile as ProfileInterface).last_name);
                }
                dispatch(authSuccess((result.additionalUserInfo.profile as ProfileInterface).email));
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error.message));
            })
    }
}

export type authAction = authStartAction | authFailAction | authSuccessAction | logoutAction | authRefreshAction;