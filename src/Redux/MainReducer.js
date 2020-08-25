import {usersAPI} from "../API/api";

const SET_USERS = "SET_USERS";
const SET_FILTER_RESULTS = "SET_FILTER_RESULTS";
const LOGOUT_RESET = "LOGOUT_RESET"
const SET_STATUS_USER_FORM = "SET_STATUS_USER_FORM";
const SET_ID_EDIT_USER = "SET_ID_EDIT_USER";
const SET_EDIT_USER_DATA = "SET_EDIT_USER_DATA";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const RESET_EDIT_FORM = "RESET_EDIT_FORM";

let initState = {
    editUserFormData: {},
    statusUserForm: "",
    idEditUser: null,
    usersFilter: [],
    users: [],
    isFetching: false,
    err: ''
}

const compareFunc = (a, b) => {
    return a.id > b.id ? -1 : a.id < b.id ? 1 : 0;
}

const MainReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.values[0].sort(compareFunc)
            };
        case SET_FILTER_RESULTS:
            return {
                ...state,
                usersFilter: action.value.length > 0 ? state.users.filter(item => item.username.toLowerCase().indexOf(action.value.toLowerCase()) !== -1) : []
            }
        case LOGOUT_RESET:
            return {
                ...state,
                users: [],
                usersFilter: [],
            }
        case SET_STATUS_USER_FORM:
            return {
                ...state,
                statusUserForm: action.value
            }
        case SET_ID_EDIT_USER:
            return {
                ...state,
                idEditUser: action.value
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.value
            }
        case SET_EDIT_USER_DATA:
            return {
                ...state,
                editUserFormData: action.values
            }
        case RESET_EDIT_FORM:
            return {
                ...state,
                editUserFormData: {},
                idEditUser: null
            }
        default:
            return state;
    }
}

const setUsers = (users) => ({type: SET_USERS, values: users});
const setStatusUserForm = (value) => ({type: SET_STATUS_USER_FORM, value});
const setIsFetching = (value) => ({type: SET_IS_FETCHING, value});

const afterOperationsUser = (token, response, dispatch) => {
    dispatch(getUsers(token));
    dispatch(setStatusUserForm(response));
    dispatch(setIsFetching(false))
    setTimeout(() => dispatch(setStatusUserForm('')), 3000)
}

export const createUserThunk = (token, values) => (dispatch) => {
    dispatch(setIsFetching(true));
    return usersAPI.createUser(token, values).then(response => {
        afterOperationsUser(token, response.statusText, dispatch);
    }).catch(err => {
        console.log(err)
        afterOperationsUser(token, "ERROR!", dispatch)
    });
};
export const updateUserThunk = (token, values, id) => (dispatch) => {
    dispatch(setIsFetching(true));
    return usersAPI.updateUser(token, values, id).then(response => {
        dispatch(readUserThunk(token, id));
        afterOperationsUser(token, response.statusText, dispatch);
    }).catch(err => {
        console.log(err)
        afterOperationsUser(token, "ERROR!", dispatch)
    });
};
export const patchUserThunk = (token, values, id) => (dispatch) => {
    dispatch(setIsFetching(true));
    return usersAPI.patchUser(token, values, id).then(response => {
        dispatch(readUserThunk(token, id));
        afterOperationsUser(token, response.statusText, dispatch);

    }).catch(err => {
        console.log(err)
        afterOperationsUser(token, "ERROR!", dispatch)
    });
};
export const deleteUserThunk = (token, id) => (dispatch) => {
    dispatch(setIsFetching(true));
    return usersAPI.deleteUser(token, id).then(response => {
        afterOperationsUser(token, response.statusText, dispatch);
    }).catch(err => {
        console.log(err)
        afterOperationsUser(token, "ERROR!", dispatch)
    });
};
export const readUserThunk = (token, id) => (dispatch) => {
    dispatch(setIsFetching(true));
    return usersAPI.readUser(token, id).then(response => {
        dispatch(setEditUserData(response.data))
        dispatch(setIsFetching(false))
    });
};

export const getUsers = (token) => (dispatch) => {
    dispatch(setIsFetching(true));
    return usersAPI.getUsers(token).then(response => {
        dispatch(setUsers([response.data]));
        dispatch(setIsFetching(false));
    });
};

export const setFilterResults = (value) => ({type: SET_FILTER_RESULTS, value});
export const logOutReset = () => ({type: LOGOUT_RESET});
export const setIdEditUser = (value) => ({type: SET_ID_EDIT_USER, value});
export const setEditUserData = (values) => ({type: SET_EDIT_USER_DATA, values});
export const resetEditForm = () => ({type: RESET_EDIT_FORM});


export default MainReducer;