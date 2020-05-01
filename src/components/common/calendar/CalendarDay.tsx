import React, {MouseEvent} from 'react';

interface CalendarDayProps {
    id: string;
    dayLabel: string;
    dayOfMonth: number;
    events: {
        id: string;
        time: number;
        title: string;
    }[];
    onDayClick: (id: string) => void;
}

const CalendarDay = ({dayLabel, dayOfMonth, events, onDayClick, id }: CalendarDayProps): React.ReactElement => {
    const onDateClick = (id: string) => (event: MouseEvent): void => {
        event.stopPropagation();
        onDayClick(id);
    };

    return <div className={'calendar-day'} onClick={onDateClick(id)}>
        <div className={'calendar-day_header'}>
            <div className={'calendar-day_header_day-of-month'}>
                {dayOfMonth + 1}
            </div>
            <div className={'calendar-day_header_day-label'}>
                {dayLabel}
            </div>
        </div>
        <div className={'calendar-day_body'}>
            <ul className={'calendar-day_body_events'} >
            {events.map((event) => {
                return <li key={event.id} className={'calendar-day_body_events_event' }>
                    <div className={'calendar-day_body_events_event_time'}>
                        {event.time}
                    </div>
                    <div className={'calendar-day_body_events_event_title'}>
                        {event.title}
                    </div>
                </li>
            })}
            </ul>
        </div>
    </div>
};

export default CalendarDay;