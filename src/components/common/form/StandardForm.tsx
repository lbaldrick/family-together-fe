import React, {useState} from 'react';
import {InputProps} from "../inputs/InputType";
import FormPage from "./FormPage";
import StandardButton from "../buttons/StandardButton";

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
    const [allPagesComplete, setAllPagesComplete] = useState<boolean>(() => pagesComplete.filter(pageComplete => pageComplete).length === props.formPages.length);

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

    const onFormPageCompleted = (): void => {
        const newPagesComplete = pagesComplete.concat([]);
        newPagesComplete[currentIndex] = true;
        setPagesComplete(newPagesComplete);
        if (newPagesComplete.filter((pageCompleted) => pageCompleted).length === props.formPages.length) {
            setAllPagesComplete(true);
        }
    };

    const onValueChanged = (id: string, value: string | number): void => {
        console.log('onValueChanged:', value)
        formFieldsState[id] = {value};
        const unPopulatedFields = props.formPages[currentIndex].filter(({initialValue}) => {

            console.log('formFieldsState[id].value ', formFieldsState[id].value )
            console.log('initialValue ', initialValue )
            return formFieldsState[id].value === initialValue
        });
        if(!unPopulatedFields.length) {
            onFormPageCompleted();
        } else {
            setAllPagesComplete(false);
        }
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



    return <div className={"form"}>
        { props.stepHeaderLabels && createStepHeader(props.stepHeaderLabels, currentIndex) }
        <div className={"form_page"}>
            {<FormPage  formFields={props.formPages[currentIndex]} onValueChanged={onValueChanged} />}
        </div>
        <div className={"form_footer"}>
            {props.formPages.length > 1 && currentIndex && <StandardButton id={"previousBtn"} label={'Previous'} isDisabled={!!currentIndex} onClick={onPreviousPage} />}
            {props.formPages.length > 1 && currentIndex === props.formPages.length -1 ? <StandardButton id={"nextBtn"} label={'Next'} isDisabled={currentIndex < props.formPages.length} onClick={onNextPage} />  :
                <StandardButton id={"finishBtn"} label={'Finish'} isDisabled={!allPagesComplete} onClick={onFinish} />}
        </div>
    </div>
};

export default StandardForm;