import React from 'react';
import Input from "../FormElements/Input";
import CheckboxGroup from "../FormElements/CheckboxGroup";

const FormikControl = (props) => {
    const {control, ...rest} = props

    switch (control) {
        case "input":
            return <Input {...rest} />
        case "checkbox":
            return <CheckboxGroup {...rest} />
        default:
            return null

    }
};

export default FormikControl;