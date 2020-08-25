import {authAPI} from "../API/api";
import {logOutReset} from "./MainReducer";

const SET_AUTH_STATUS = "SET_AUTH_STATUS"
const SET_AUTH_ERROR = "SET_AUTH_ERROR"
const LOGOUT = "LOGOUT"

let initState = {
    isAuth: false,
    error: null,
    token: localStorage.getItem('token'),
}


const authReducer = (state = initState, action) => {
    switch (action.type) {

        case SET_AUTH_STATUS:
            return {
                ...state,
                token: action.payload,
                error: null
            };
        case SET_AUTH_ERROR:
            return {
                ...state,
                error: action.error.message
            }
        case LOGOUT:
            return {
                ...state,
                isAuth: false,
                token: null,
                error: null
            }
        default:
            return state;


    }
}


export const setAuthStatus = (response) => ({type: SET_AUTH_STATUS, payload: response.data.token});
export const setAuthError = (response) => ({type: SET_AUTH_ERROR, error: response});
export const logOut = () => ({type: LOGOUT});


export const login = (username, password) => (dispatch) => {
    return authAPI.login(username, password).then(response => {
        dispatch(setAuthStatus(response));
        localStorage.setItem('token', response.data.token);
    }).catch(err => dispatch(setAuthError(err)));
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch(logOutReset());
    dispatch(logOut());
};

export default authReducer;