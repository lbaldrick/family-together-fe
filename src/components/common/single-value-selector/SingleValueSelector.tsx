import React, {useState} from 'react';
import {InputItem} from "../inputs/ValueInput";
import './single-value-selector.scss';

interface SingleValueSelector {
    values: InputItem[];
    initialValueIndex: number;
    onChange: (id: string, value: string | number) => void;
}

const SingleValueSelector = ({values, initialValueIndex, onChange}: SingleValueSelector): React.ReactElement => {
    const [currentIndex, setCurrentIndex] = useState<number>(initialValueIndex);

    const onPrevious = (): void => {
        let nextIndex;
        if (currentIndex === 0) {
            nextIndex = values.length - 1;
            setCurrentIndex(nextIndex);
        } else {
            nextIndex = currentIndex - 1;
            setCurrentIndex(nextIndex);
        }

        const value = values[nextIndex];
        onChange(value.id, value.value);
    };

    const onNext = (): void => {
        let nextIndex = 0;
        if (currentIndex === values.length - 1) {
            setCurrentIndex(nextIndex)
        } else {
            nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
        }

        const value = values[nextIndex];
        onChange(value.id, value.value);
    };

    return <div className={'single-value-selector'}>
        <div className={'single-value-selector arrow-left'} onClick={onPrevious}/>
        <div className={'single-value-selector_label'}>{values[currentIndex].label}</div>
        <div className={'single-value-selector arrow-right'} onClick={onNext}/>
    </div>
};

export default SingleValueSelector;