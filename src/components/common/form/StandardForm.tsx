import React, {useState} from 'react';
import {InputProps} from "../inputs/InputType";
import FormPage from "./FormPage";

type FormProps = {
    formPages: FormField[][];
    currentFormIndex: number;
    stepHeaderLabels?: string[];
}

export interface FormField {
    id: string;
    component: React.FC<InputProps>;
    isRequired: boolean;
    validationFn?: (value: string | number) => boolean;
    initialValue: string | number;
    type: string;
    label: string;
}

interface FormFieldState {
    [key: string]: {
        value: string | number;
    };
}


const createStepHeader = (stepHeaderLabels: string[], currentIndex: number): React.ReactElement => {
    return <div className={"form_step-header"}>
        {
            stepHeaderLabels.map((lbl, index) => {
                return <div key={lbl + index} className={`form_step-header_label ${currentIndex === index ? "--active" : ""}`}>
                    {lbl}
                </div>
            })
        }
    </div>
};

const StandardForm = (props: FormProps): React.ReactElement => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [pagesComplete, setPagesComplete] = useState<boolean[]>(() => props.formPages.map(() => false));

    //only needed for saving the data after submit dont want a rerender every change so not added to state
    const formFieldsState: FormFieldState = (()  => {
        return props.formPages.flat().reduce((accumulator, formField) => {
            return {
                ...accumulator,
                [formField.id]: {
                    value: formField.initialValue,
                }
            };
        }, {})
    })();

    const onValueChanged = (id: string, value: string | number) => {
        formFieldsState[id] = {value};
    };

    const onNextPage = (): void => {
        if (currentIndex < props.formPages.length) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const onPreviousPage = (): void => {
        if (currentIndex) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const onFinish = (): void => {
        console.log("Finished"); // save the form data
    };

    const onFormPageCompleted = () => {
        const newPagesComplete = pagesComplete.concat([]);
        newPagesComplete[currentIndex] = true;
        setPagesComplete(newPagesComplete)
    };

    return <div className={"form"}>
        { props.stepHeaderLabels && createStepHeader(props.stepHeaderLabels, currentIndex) }
        <div className={"form_page"}>
            {<FormPage onFormComplete={onFormPageCompleted} formFields={props.formPages[currentIndex]} onValueChanged={onValueChanged} />}
        </div>
        <div className={"form_footer"}>
            {props.formPages.length > 1 && currentIndex && <button onClick={onPreviousPage}>Previous</button>}
            {props.formPages.length > 1 && currentIndex === props.formPages.length -1 ? <button className={`form-btn${pagesComplete[currentIndex] ? '--enabled' : '--disabled'}`} onClick={onNextPage}>Next</button> : <button onClick={onFinish}>Finish</button>}
        </div>
    </div>
};

export default StandardForm;