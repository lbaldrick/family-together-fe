import React, {useState, MouseEvent} from 'react';
import './dropdown.scss';
import {InputProps} from "../inputs/ValueInput";

const Dropdown = (props: InputProps): React.ReactElement => {
    const [value, setValue] = useState(() => {
        if (props.initialValue) {
            return props.initialValue;
        }

        return props.type === 'text' ? '' : 0;
    });

    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const onChange = (id: string, value: number | string, label: string | number): void => {
        setValue(label);
        props.onChange(id, value);
    };

    const onClick = (event:  MouseEvent): void => {
        event.stopPropagation();
        setDropdownOpen(!dropdownOpen);
    };

    return <div className={'dropdown'}>
        <div className={'dropdown_value'} onClick={onClick}>
        <input className={'dropdown_value_input'} placeholder={props.placeholder} readOnly={true} value={value} />
            <div className={`arrow ${dropdownOpen ? 'arrow--down' : ''}`}/>
        </div>
        <ul className={`dropdown_list ${!dropdownOpen ? 'dropdown_list--hidden' : '' }`}>

            {
                props.items?.map((item) => {
                    return <li key={item.id}
                               className={`dropdown_list_item ${item.label === value ? 'dropdown_list_item--selected' : '' }`}
                               onClick={(): void => onChange(props.id, item.value, item.label)}>
                        {item.label}
                    </li>
                })
            }
        </ul>
    </div>
};

export default Dropdown;