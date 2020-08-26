import React from 'react';
import {Formik} from "formik";
import {StyledButton, StyledButtonRed, StyledForm, StyledFormTitle} from "../FormElements/StyledFormElements";
import FormikControl from "../FormikControl/FormikControl";

const UserForm = (props) => {


    return (<Formik initialValues={props.initialValues}
                    validationSchema={props.validationSchema} onSubmit={props.onSubmit} enableReinitialize={true}>
            {
                handleForm => {
                    return <StyledForm onReset={handleForm.handleReset}
                                       onSubmit={handleForm.handleSubmit}>
                        <StyledFormTitle>{props.title}</StyledFormTitle>
                        <FormikControl control="input" name="username" type="text" label="Username"
                                       placeholder="You're username"/>
                        <FormikControl control="input" name="first_name" type="text" label="First name"
                                       placeholder="You're first name"/>
                        <FormikControl control="input" name="last_name" type="text" label="Last name"
                                       placeholder="You're last name"/>
                        <FormikControl control="input" name="password" type="text" label="Password"
                                       placeholder="You're password"/>
                        <FormikControl control="checkbox" name="is_active" label="Is active" options={props.checkbox}/>

                        {props.idEditUser? <StyledButtonRed type="reset" onClick={props.onReset}
                                                            disabled={!handleForm.isValid || handleForm.isSubmitting}>Cancel</StyledButtonRed> : null}
                        <StyledButton type="submit"
                                      disabled={!handleForm.isValid || handleForm.isSubmitting}>{handleForm.isSubmitting ? "Processing..." : props.submitBtnText}</StyledButton>

                        {props.status ? <h2>{props.status}</h2> : null}
                    </StyledForm>
                }
            }
        </Formik>
    );
};

export default UserForm;