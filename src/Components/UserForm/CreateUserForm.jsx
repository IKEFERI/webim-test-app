import React, {useRef} from 'react';
import {Formik} from "formik";
import {StyledButton, StyledForm, StyledFormTitle} from "../FormElements/StyledFormElements";
import FormikControl from "../FormikControl/FormikControl";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {createUserThunk} from "../../Redux/MainReducer";

const CreateUserForm = (props) => {
    const dispatch = useDispatch();
    const formikRef = useRef(null);
    const checkbox = [{key: "is_active", value: "true"}]
    const createUserDispatchThunk = (token, values) => dispatch(createUserThunk(token, values));
    const token = useSelector(state => state.authState.token);
    const status = useSelector(state => state.usersState.statusUserForm);

    const initialValues = {
        username: "",
        first_name: "",
        last_name: "",
        password: "",
        is_active: true
    }
    const validationSchema = Yup.object({
        username: Yup.string().required("Required").max(150).matches(/^[\w.@+-]+$/, {excludeEmptyString: true}),
        first_name: Yup.string().required("Required").max(30),
        last_name: Yup.string().required("Required").max(150),
        password: Yup.string().required("Required").max(128).matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, {excludeEmptyString: true}),
        is_active: Yup.bool()
    })
    const onSubmit = (values, onSubmitProps) => {
            createUserDispatchThunk(token, values).then(() => {
                if (formikRef.current !== null) {
                    onSubmitProps.resetForm();
                    onSubmitProps.setSubmitting(false)
                }
            })
    }
    return (<Formik initialValues={initialValues}
                    validationSchema={validationSchema} onSubmit={onSubmit}>
            {
                formik => {
                    return <StyledForm ref={formikRef} onReset={formik.handleReset}
                                       onSubmit={formik.handleSubmit} {...props} >
                        <StyledFormTitle>Create new user</StyledFormTitle>
                        <FormikControl control="input" name="username" type="text" label="Username"
                                       placeholder="You're username"/>
                        <FormikControl control="input" name="first_name" type="text" label="First name"
                                       placeholder="You're first name"/>
                        <FormikControl control="input" name="last_name" type="text" label="Last name"
                                       placeholder="You're last name"/>
                        <FormikControl control="input" name="password" type="text" label="Password"
                                       placeholder="You're password"/>
                        <FormikControl control="checkbox" name="is_active" label="Is active" options={checkbox}/>
                        <StyledButton type="submit"
                                      disabled={!formik.isValid || formik.isSubmitting}>{formik.isSubmitting ? "Creating..." : "Create"}</StyledButton>
                        {status ? <h2>{status}</h2> : null}
                    </StyledForm>
                }
            }
        </Formik>
    );
};

export default CreateUserForm;