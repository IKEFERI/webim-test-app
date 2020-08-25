import React from 'react';
import {ErrorMessage, Field} from "formik";
import {StyledCheckbox, StyledFormFieldError} from "./StyledFormElements";

const CheckboxGroup = (props) => {
    const {label, name, options, ...rest} = props
    return (
        <StyledCheckbox>
            <Field name={name}>
                {({field}) => {
                    return options.map(option => {
                        return (
                            <React.Fragment key={option.key}>
                                <input
                                    type='checkbox'
                                    id={option.key}
                                    {...field}
                                    {...rest}
                                    value={option.value}
                                    checked={field.value}
                                />
                                <label htmlFor={option.key}>{label}</label>
                            </React.Fragment>
                        )
                    })
                }}
            </Field>
            <ErrorMessage name={name} component={StyledFormFieldError}/>
        </StyledCheckbox>


    )
};

export default CheckboxGroup;