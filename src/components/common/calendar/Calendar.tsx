import React, {useState} from 'react';
import CalendarControls from "./CalenderControls";
import {getDay, getDaysInMonth, getYear} from "date-fns";
import CalendarDay from "./CalendarDay";

interface CalendarEventType {
    id: string;
    title: string;
    description: string;
    eventDateTime: number;
    attendees: string[];
}

interface DayType {
    dayLabel: string;
    dayOfWeek: number;
    dayOfMonth: number;
    year: number;
}

const daysOfWeek = [
    {
       id: 'MON',
       label: 'Monday',
       value: 0,
    },
    {
        id: 'TUES',
        label: 'Tuesday',
        value: 1,
    },
    {
        id: 'WED',
        label: 'Wednesday',
        value: 2,
    },
    {
        id: 'THURS',
        label: 'Thursday',
        value: 3,
    },
    {
        id: 'FRI',
        label: 'Friday',
        value: 4,
    },
    {
        id: 'SAT',
        label: 'Saturday',
        value: 5,
    },
    {
        id: 'SUN',
        label: 'Sunday',
        value: 6,
    },
];

const monthValues = [
    {
        id: 'JAN',
        label: 'January',
        value: 0,
    },
    {
        id: 'FEB',
        label: 'February',
        value: 1,
    },
    {
        id: 'MAR',
        label: 'March',
        value: 2,
    },
    {
        id: 'APR',
        label: 'April',
        value: 3,
    },
    {
        id: 'MAY',
        label: 'May',
        value: 4,
    },
    {
        id: 'JUNE',
        label: 'June',
        value: 5,
    },
    {
        id: 'JULY',
        label: 'July',
        value: 6,
    },
    {
        id: 'AUG',
        label: 'August',
        value: 7,
    },
    {
        id: 'SEPT',
        label: 'September',
        value: 8,
    },
    {
        id: 'OCT',
        label: 'October',
        value: 9,
    },
    {
        id: 'NOV',
        label: 'November',
        value: 10,
    },
    {
        id: 'DEC',
        label: 'December',
        value: 11,
    },
];

const yearValues = [
    {
        id: '2020',
        label: '2020',
        value: 2020,
    },
    {
        id: '2021',
        label: '2021',
        value: 2021,
    },
];


const getDaysForMonth = (year: number, month: number): DayType[] => {
    const daysInMonth = getDaysInMonth(new Date(year, month));
    const firstDayOfMonth = getDay(new Date(year, month, 0));
    const calendarMonth: DayType[] = [];


    for (let x = 0; x < daysInMonth; x++) {
        console.log('year', year)
        console.log('month', month)
        console.log('first day of month', firstDayOfMonth)
        console.log('day of month', (firstDayOfMonth + x) % 7)
        const dayOfWeekIndex = (firstDayOfMonth + x) % 7;
        const dayOfWeek = daysOfWeek[dayOfWeekIndex];
        console.log('dayOfWeek', dayOfWeek)
        calendarMonth.push({
            dayLabel: dayOfWeek.label,
            dayOfWeek: dayOfWeek.value,
            dayOfMonth: x,
            year,
        })
    }
    return calendarMonth;
};

interface CalendarProps {
    events?: CalendarEventType[];
}

const Calendar = ({events}: CalendarProps): React.ReactElement => {
    const [year, setYear] = useState(2020);
    const [month, setMonth] = useState(1);

    const onMonthChange = (id: string, value: number): void => {
        console.log('id', id);
        console.log('value', value);
        setMonth(value);
    };

    const onYearChange = (id: string, value: number): void => {
        console.log('id', id);
        console.log('value', value);
        setYear(value);
    };

    const onDayClick = (id: string) => {
        console.log(id);
    };

    return <div className={'calendar'}>
        <CalendarControls monthValues={monthValues} yearValues={yearValues} initialMonthValueIndex={2} initialYearValueIndex={0} onMonthChange={onMonthChange} onYearChange={onYearChange}/>
        <div className={'calendar_dates'}>
            {getDaysForMonth(year, month).map(({dayLabel, dayOfMonth}) => {
                return <CalendarDay key={dayOfMonth + '-' + year} id={dayOfMonth + '-' + year} dayLabel={dayLabel} dayOfMonth={dayOfMonth} events={[]} onDayClick={onDayClick}/>
            })}
        </div>
    </div>
};

export default Calendar;