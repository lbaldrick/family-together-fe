import React, {useState} from "react";
import {FormFieldType} from "./StandardForm";
import StandardButton from "../buttons/StandardButton";
import "./form.scss";

export interface FormListProps {
    id: string;
    formFields: FormFieldType[];
    header?: string;
    onAdd: (id: string, items: FormListItemType[]) => void;
    onDelete: (id: string, items: FormListItemType[]) => void;
    initialValue: FormListItemType[];
}

export type FormListItemType = {
    [key: string]: {
        value: string | number;
        isValid: boolean;
    };
}

const formListItems = (items: FormListItemType[], onDeleteItem: (index: number) => void): React.ReactElement => {
    return   <div className={'form-list_items'}>
        {items.map((item, itemIndex) => {
            return <div key={itemIndex} className={'form-list_items_item'}>
                <div className={'form-list_items_item_values'}>
                {Object.values(item).map((key, valueIndex) => {
                    return <div key={valueIndex} className={'form-list_items_item_values_value'}>
                        {key.value}
                    </div>
                })}
                </div>
                <StandardButton onClick={(): void => onDeleteItem(itemIndex)} id={'deleteItem'} label={'Delete'} isSecondary={true}/>
            </div>
        })}
    </div>
};

export const FormList = (props: FormListProps): React.ReactElement => {
    const [items, setItems] = useState<FormListItemType[]>(props.initialValue);
    const [values, setValues] = useState<FormListItemType>({});
    const [formComplete, setFormComplete] = useState<boolean>(() => {
        return !props.formFields.filter(({isRequired}) => isRequired).length
    });

    const onChange = (id: string, value: number | string, isValid = true): void => {
        console.log('VALUE', value)
        if (!Array.isArray(value)) {
            const newValues: FormListItemType = {
                ...values,
                [id]: {
                    value,
                    isValid,
                },
            };

            console.log(newValues)
            setValues(newValues);

            const validValues = Object.values(newValues).filter(({isValid}) => isValid);
            setFormComplete(validValues.length === props.formFields.length)
        }
    };

    const onDeleteItem = (itemIndex: number): void => {
        items.splice(itemIndex, 1);
        setItems(items.concat([]));
        props.onDelete(props.id, items);
    };

    const onAddItem = (): void => {
        const newItems = items.concat([values]);
        console.log('newItems', newItems)
        setItems(newItems);
        props.onAdd(props.id, newItems);
    };


    return <div className={'form-list'}>
        {props.header && <div className={'form-list_header'}>{props.header}</div>}
        <div className={'form-list_form'}>
            {props.formFields.map((formField) => {
                return (<div key={formField.id} className={'form-list_field'}>
                    <formField.component
                        onChange={onChange}
                        initialValue={formField.initialValue}
                        id={formField.id}
                        type={formField.type}
                        isRequired={formField.isRequired}
                        placeholder={formField.placeholder}
                        validationFn={formField.validationFn}
                        items={formField.items}
                    />
            </div>)
        })}
            <div className={'form-list_form_controls'}>
                <StandardButton onClick={onAddItem} isDisabled={!formComplete} id={'addItem'} label={'Add'} isSecondary={false}/>
            </div>
        </div>
        {formListItems(items, onDeleteItem)}
    </div>
};

