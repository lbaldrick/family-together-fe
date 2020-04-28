import React from 'react';
import {FormFieldType, FormListType} from "./StandardForm";
import {FormListItemType} from "./FormList";

export interface FormPageProps {
    header?: string;
    formFields: (FormFieldType | FormListType)[];
    onValueChanged: (id: string, value: string | number| FormListItemType[], isValid?: boolean) => void;
}

const FormPage = (props: FormPageProps): React.ReactElement => {
    const onChange = (id: string, value: string | number, isValid?: boolean): void => {
        props.onValueChanged(id, value, isValid);
    };

    const onDeleteOrAddItem = (id: string, items: FormListItemType[]): void => {
        console.log('items: ', items);
        props.onValueChanged(id, items);
    };


    return <div className={'form-page'}>
        {props.header && <div className={'form-page_header'}>{props.header}</div>}
        {props.formFields.map((formField) => {
            return (<div key={formField.id} className={'form-page_field'}>
                { (formField.objectType === 'FormField') && <formField.component
                    onChange={onChange}
                    initialValue={formField.initialValue}
                    id={formField.id}
                    type={formField.type}
                    isRequired={formField.isRequired}
                    placeholder={formField.placeholder}
                />}
                { (formField.objectType === 'FormList') && <formField.component
                    header={formField.header}
                    formFields={formField.formFields}
                    onAdd={onDeleteOrAddItem}
                    onDelete={onDeleteOrAddItem}
                    id={formField.id}
                />}
            </div>)
        })}
    </div>
};

export default FormPage;