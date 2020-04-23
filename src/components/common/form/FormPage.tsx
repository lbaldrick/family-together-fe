import React from 'react';
import {FormField} from "./StandardForm";

export interface FormPageProps {
    header?: string;
    onFormComplete: (isComplete: boolean) => void;
    formFields: FormField[];
    onValueChanged: (id: string, value: string | number) => void;
}

const FormPage = (props: FormPageProps): React.ReactElement => {
    const onChange = (id: string, value: string | number) => (): void => {
        props.onValueChanged(id, value)
    };

    return <div className={'form-page'}>
        {props.header && <div className={'form-page_header'}>{props.header}</div>}
        {props.formFields.map((formField) => {
            return (<div key={formField.id} className={'form-page_header'}>
                <formField.component
                    onChange={onChange}
                    initialValue={formField.initialValue}
                    id={formField.id}
                    type={formField.type}
                    isRequired={formField.isRequired}
                    label={formField.label}
                />
            </div>)
        })}
    </div>
};

export default FormPage;