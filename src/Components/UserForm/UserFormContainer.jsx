import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createUserThunk, patchUserThunk, readUserThunk, resetEditForm, updateUserThunk} from "../../Redux/MainReducer";
import UserForm from "./UserForm";
import * as Yup from "yup";

const UserFormContainer = () => {
    const checkbox = [{key: "is_active", value: "true"}]

    const dispatch = useDispatch();
    const readUserDispatchThunk = useCallback((token, id) => dispatch(readUserThunk(token, id)), [dispatch]);
    const createUserDispatchThunk = useCallback((token, values) => dispatch(createUserThunk(token, values)), [dispatch]);
    const resetEditFormDispatch = useCallback(() => dispatch(resetEditForm()), [dispatch]);

    const token = useSelector(state => state.authState.token);
    const status = useSelector(state => state.usersState.statusUserForm);
    const idEditUser = useSelector(state => state.usersState.idEditUser);
    const editUserFormData = useSelector(state => state.usersState.editUserFormData);

    const updateUserDispatchThunk = (token, values, id) => dispatch(updateUserThunk(token, values, id));
    const patchUserDispatchThunk = (token, values, id) => dispatch(patchUserThunk(token, values, id));

    const onSubmitEditForm = (values, onSubmitProps) => {
        let newObj = {};
        Object.keys(values).forEach(key => {
            if ((key === "password") && (values[key].length === 0)) {
                return;
            }
            if (values[key] !== editUserFormData[key]) {
                newObj = {...newObj, [key]: values[key]}
            }
        });
        if (Object.keys(values).length === Object.keys(newObj).length) {
            updateUserDispatchThunk(token, values, idEditUser).then(() => {
                onSubmitProps.resetForm();
                onSubmitProps.setSubmitting(false)
            });
        } else {
            patchUserDispatchThunk(token, newObj, idEditUser).then(() => {
                onSubmitProps.resetForm();
                onSubmitProps.setSubmitting(false)
            });
        }
    }

    const onSubmitCreateForm = (values, onSubmitProps) => {
        createUserDispatchThunk(token, values).then(() => {
            onSubmitProps.resetForm();
            onSubmitProps.setSubmitting(false)
        });
    }
    const onResetForm = () => {
        resetEditFormDispatch();
    }
    useEffect(() => {
        if (idEditUser) {
            readUserDispatchThunk(token, idEditUser);
        }
    }, [token, idEditUser, readUserDispatchThunk])


    const initialValues = {
        username: editUserFormData.username ? editUserFormData.username : '',
        first_name: editUserFormData.first_name ? editUserFormData.first_name : '',
        last_name: editUserFormData.last_name ? editUserFormData.last_name : '',
        password: '',
        is_active: editUserFormData.is_active ? editUserFormData.is_active : true
    }
    const validationSchema = Yup.object({
        username: Yup.string().required("Required").max(150, "Too long!").matches(/^[\w.@+-]+$/, {excludeEmptyString: true}, 'Letters, digits and @/./+/-/_ only.'),
        first_name: Yup.string().required("Required").max(30, "Too long!"),
        last_name: Yup.string().required("Required").max(150, "Too long!"),
        password: !editUserFormData.username ?
            Yup.string().max(128, "Too long!").matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, "Required: min 8 symbols - uppercase, lower case, numbers", {excludeEmptyString: true}).required("Required")
            : Yup.string().max(128, "Too long!").matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, "Required: min 8 symbols - uppercase, lower case, numbers", {excludeEmptyString: true}),
        is_active: Yup.bool()
    })

    const propsToForm = {initialValues, status, validationSchema, checkbox, idEditUser}

    return <>
        {Object.keys(editUserFormData).length === 0 ?
            <UserForm {...propsToForm} submitBtnText={"Create"} title={"Create new user"}
                      onSubmit={onSubmitCreateForm}/>
            : <UserForm {...propsToForm} submitBtnText={"Edit"} title={"Edit user"} onSubmit={onSubmitEditForm}
                        onReset={onResetForm}/>
        }
    </>
};

export default UserFormContainer;