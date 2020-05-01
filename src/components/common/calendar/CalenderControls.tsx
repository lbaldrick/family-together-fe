import React from 'react';
import SingleValueSelector from "../single-value-selector/SingleValueSelector";
import {InputItem} from "../inputs/ValueInput";
import './calendar.scss';

interface SingleValueSelectorProps {
    monthValues: InputItem[];
    yearValues: InputItem[];
    initialMonthValueIndex: number;
    initialYearValueIndex: number;
    onMonthChange: (id: string, value: number) => void;
    onYearChange: (id: string, value: number) => void;
}

const CalendarControls = ({monthValues, yearValues, initialMonthValueIndex, initialYearValueIndex, onMonthChange, onYearChange}: SingleValueSelectorProps): React.ReactElement => {
    return <div className={'calendar-controls'}>
        <div className={'calendar-controls_months'}>
            <SingleValueSelector values={monthValues} initialValueIndex={initialMonthValueIndex} onChange={(id,value) => onMonthChange(id, Number(value))}/>
        </div>
        <div className={'calendar-controls_years'}>
            <SingleValueSelector values={yearValues} initialValueIndex={initialYearValueIndex} onChange={(id,value) => onYearChange(id, Number(value))}/>
        </div>
    </div>
};

export default CalendarControls;