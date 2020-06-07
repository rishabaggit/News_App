export interface AuthState {
    userId: string,
    error: boolean,
    loading: boolean,
  }

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_REDIRECT_TOGGLE = 'AUTH_REDIRECT_TOGGLE';

interface AuthStartAction {
    type: typeof AUTH_START
}
interface AuthSuccessAction {
    type: typeof AUTH_SUCCESS
    userId:string
}
interface AuthFailAction {
    type: typeof AUTH_FAIL,
    error: boolean
}
interface AuthLogoutAction {
    type: typeof AUTH_LOGOUT
}
// interface AuthRedirectAction {
//     type: typeof AUTH_REDIRECT_TOGGLE
// }

export type AuthAction = AuthStartAction | AuthSuccessAction | AuthFailAction |
                        AuthLogoutAction;