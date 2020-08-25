import React from 'react';
import {ErrorMessage, Field} from "formik";
import {StyledFormFieldError, StyledInput} from "./StyledFormElements";


const Input = (props) => {
    const {label, name, ...rest} = props;
    return (
        <StyledInput>
            <label htmlFor={name}>{label}</label>
            <Field id={name} name={name} {...rest} />
            <ErrorMessage name={name} component={StyledFormFieldError}/>
        </StyledInput>
    );
};

export default Input;