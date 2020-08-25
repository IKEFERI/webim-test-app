import React, {useRef} from 'react';
import * as Yup from "yup"
import {Formik} from "formik";
import FormikControl from "../FormikControl/FormikControl";
import {login, logout} from "../../Redux/AuthReducer";
import {useDispatch, useSelector} from "react-redux";
import {StyledButton, StyledForm, StyledFormTitle} from "../FormElements/StyledFormElements";

const LoginForm = (props) => {
    const dispatch = useDispatch();
    const loggingInThunk = (username, password) => dispatch(login(username, password));
    const logOutThunk = () => dispatch(logout());
    const errMsg = useSelector(state => state.authState.error);
    const token = useSelector(state => state.authState.token);
    const initialValues = {
        username: "",
        password: ""
    }


    const validationSchema = Yup.object({
        username: Yup.string().required("Required"),
        password: Yup.string().required("Required")
    })
    const onSubmit = (values, onSubmitProps) => {
        console.log("form data", values)
        loggingInThunk(values.username, values.password).then(() => {
            if (formikRef.current !== null){
                onSubmitProps.setSubmitting(false)
            }

        })
    }
    const formikRef = useRef(null);

    return (!token ?
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    formik => {
                        return <StyledForm ref={formikRef} onReset={formik.handleReset} onSubmit={formik.handleSubmit} {...props} >
                            <StyledFormTitle>Log in</StyledFormTitle>
                            <FormikControl control="input" name="username" type="text" label="Username"
                                           placeholder="You're username"/>
                            <FormikControl control="input" name="password" type="text" label="Password"
                                           placeholder="You're password"/>
                            <StyledButton type="submit"
                                          disabled={!formik.isValid || formik.isSubmitting}>{formik.isSubmitting ? "Log in..." : "Log in"}</StyledButton>
                            {errMsg ? <h2>{errMsg}</h2> : null}
                        </StyledForm>
                    }
                }
            </Formik> :
            <StyledButton onClick={logOutThunk}>Log Out</StyledButton>

    );
};

export default LoginForm;


