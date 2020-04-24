import React, {ChangeEvent, useRef, useState} from "react";
import {debounce} from "lodash";
import {InputProps} from "./InputType";


const ValueInput = (props: InputProps): React.ReactElement => {
    //handle state here to stop rerender
    const [value, setValue] = useState<number|string>(props.initialValue);
    const [isValid, setIsValid] = useState<boolean | undefined>(undefined);
    const [lostFocus, setLostFocus] = useState<boolean>(false);

    //send value up so parent components can have it but parent doesnt handle the value state here
    const onValueChange = (value: string | number): void => {
        console.log('value:', value);
        console.log('id:', props.id);
        props.onChange(props.id, value);
        setValue(value);
        if(props.validationFn) {
            setIsValid(props.validationFn(value))
        }

    };

    const debouncedUpdate = debounce(value => onValueChange(value), 50);

    //TODO extract the validation logic out to a separate component
    return <div className={'value-input'} >
        {props.label && <label htmlFor={props.id}>{props.label}</label>}

        <input className={"value-input_input"}
               onChange={({ target: { value } }) => debouncedUpdate(value)}
               type={props.type}
               name={props.label}
               value={value}
               onBlur={(): void => setLostFocus(true)} onFocus={(): void => setLostFocus(false)}/>

        {isValid !== undefined && !isValid && value !== undefined && <div>
            Invalid
        </div>}

        {props.isRequired && lostFocus && !value.toString.length && <div className={"text-input--required"}>
            Required
        </div>}
    </div>
};

export default ValueInput;