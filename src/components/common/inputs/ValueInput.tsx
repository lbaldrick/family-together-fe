import React, {useState} from "react";
import {debounce} from "lodash";
import "./input.scss";

export interface InputItem {
    id: string;
    label: string;
    value: string | number;
}

export interface InputProps {
    id: string;
    initialValue?: string | number;
    type: string;
    label?: string;
    placeholder?: string;
    onChange: (id: string, value: string | number, isValid?: boolean) => void;
    validationFn?: (value: string | number) => boolean;
    isRequired: boolean;
    initialValues?: {[key: string]: string | number}[];
    items?: InputItem[];
}

const ValueInput = (props: InputProps): React.ReactElement => {
    //handle state here to stop rerender
    const [value, setValue] = useState<number|string>(() => {
        if (props.initialValue) {
            return props.initialValue
        } else {
            return props.type === 'text' ? '' : 0
        }
    });
    const [isValid, setIsValid] = useState<boolean | undefined>(undefined);
    const [lostFocus, setLostFocus] = useState<boolean>(false);

    //send value up so parent components can have it but parent doesnt handle the value state here
    const onValueChange = (value: string | number): void => {
        const isInputValid = (props.validationFn && props.validationFn(value)) || !props.isRequired || (props.isRequired && value !== 0 || value !== '');
        setValue(value);
        setIsValid(isInputValid);
        props.onChange(props.id, value, isInputValid);
    };

    const debouncedUpdate = debounce(value => onValueChange(value), 50);

    //TODO extract the validation logic out to a separate component
    return <div className={'value-input'} >
        {props.label && <label htmlFor={props.id}>{props.label}</label>}

        <input className={"value-input_input"}
               onChange={( event): void => {
                   event.stopPropagation();
                   event.preventDefault();
                   debouncedUpdate(event.target.value);
               }}
               type={props.type}
               name={props.label}
               value={value}
               placeholder={props.placeholder}
               onBlur={(): void => setLostFocus(true)} onFocus={(): void => setLostFocus(false)}/>

        {isValid !== undefined && !isValid && value !== undefined && <div>
            Invalid
        </div>}

        {props.isRequired && lostFocus && (value === 0 || value === '') && <div className={"value-input_required"}>
            Required
        </div>}
    </div>
};

export default ValueInput;