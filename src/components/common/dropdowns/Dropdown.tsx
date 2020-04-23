import React from 'react';

interface DropDownItem {
    id: string;
    label: string;
    value: string | number;
}

interface DropdownProps {
    items: DropDownItem[];
    onValueSelected: (id: string, value: string | number) => void;
}

const Dropdown = (props: DropdownProps): React.ReactElement => {
    return <div className={'dropdown'}>
        <ul className={'dropdown_items'}>
            {
                props.items.map((item) => {
                    return <li key={item.id} className={'dropdown_items_item'} onClick={() => props.onValueSelected(item.id, item.value)}/>
                })
            }
        </ul>
    </div>
};

export default Dropdown;