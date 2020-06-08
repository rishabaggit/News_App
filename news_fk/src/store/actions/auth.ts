import * as actionTypes from './actionTypes';
import {FIREBASE_API_KEY} from '../../constants';
import axios from 'axios';
import { app, facebookProvider } from '../../components/UserAuthentication/firebase'
import { newUser } from 'components/UserData/FirestoreUtil';
import { RootState } from 'index';


interface authStartAction{
    type: typeof actionTypes.AUTH_START;
};

interface authSuccessAction{
    type: typeof actionTypes.AUTH_SUCCESS;
    userId: string;
};

interface authFailAction{
    type: typeof actionTypes.AUTH_FAIL;
    error: any;
};

interface logoutAction{
    type: typeof actionTypes.AUTH_LOGOUT;
};

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (userId:string) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId
    };
};
export const authFail = (error:any) => {
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

export const authWithEmail = (userData: any, SignIn: any) => {
    return (dispatch:any) => {
        dispatch(authStart());
        const authData = {
            email: userData.email,
            password: userData.password,
            returnSecureToken: true
        };
        const type = SignIn? 'signInWithPassword' : 'signUp';
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:${type}?key=${FIREBASE_API_KEY}`;

        axios.post(url, authData)
            .then(response => {
                if(!SignIn) {
                    newUser(userData.email ,userData.fname , userData.lname );
                }
                dispatch(authSuccess(userData.email));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error.message));
            });
    };
};


export const authWithFacebook = () => {
    return (dispatch:any) => {
        dispatch(authStart());
        app.auth().signInWithPopup(facebookProvider)
        .then(result => {
            newUser((result.additionalUserInfo.profile as any).email,
                (result.additionalUserInfo.profile as any).first_name,
                (result.additionalUserInfo.profile as any).last_name);
            dispatch(authSuccess((result.additionalUserInfo.profile as any).email));
        })
        .catch(error => {
            console.log(error);
            dispatch(authFail(error.message));
        })
    }
}

export type authAction = authStartAction | authFailAction | authSuccessAction | logoutAction;