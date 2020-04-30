import React, {useEffect, useState} from 'react';
import FormPage from "./FormPage";
import StandardButton from "../buttons/StandardButton";
import './form.scss';
import {FormListItemType, FormListProps} from "./FormList";
import {InputItem, InputProps} from "../inputs/ValueInput";



export interface FormFieldType {
    id: string;
    component: React.FC<InputProps>;
    isRequired: boolean;
    validationFn?: (value: string | number) => boolean;
    initialValue?: string | number;
    type: string;
    label?: string;
    placeholder?: string;
    objectType: 'FormField';
    items?: InputItem[];
}

export interface FormListType {
    id: string;
    formFields: FormFieldType[];
    objectType: 'FormList';
    component: React.FC<FormListProps>;
    header?: string;
    initialValue: FormListItemType[];
}

type FormProps = {
    formPages: (FormFieldType | FormListType)[][];
    currentFormIndex: number;
    stepHeaderLabels?: string[];
    onFormFinished: (result: any) => void;
}


interface FormFieldState {
    [key: string]: {
        value: string | number | FormListItemType[];
        isValid: boolean;
    };
}

function instanceOfFormFieldType(object: any): object is FormFieldType {
    return object.objectType === 'FormField';
}


const createStepHeader = (stepHeaderLabels: string[], currentIndex: number, onClick: (index: number) => void): React.ReactElement => {
    return <div className={"form_step-header"}>
        {
            stepHeaderLabels.map((lbl, index) => {
                return <div key={lbl + index} className={`form_step-header_label ${currentIndex === index ? "--active" : ""}`} onClick={(): void => onClick(index)}>
                    {lbl}
                </div>
            })
        }
    </div>
};

let formFieldsState: FormFieldState;

const StandardForm = (props: FormProps): React.ReactElement => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [pagesComplete, setPagesComplete] = useState<boolean[]>(() => props.formPages.map(() => false));
    const [allPagesComplete, setAllPagesComplete] = useState<boolean>(() => pagesComplete.filter(pageComplete => pageComplete).length === props.formPages.length);
    //Dont use the  state set method to update the formPagesState as dont want to cause a rerender everytime
    const [formPagesState] = useState<(FormFieldType | FormListType)[][]>(() => props.formPages.map((page) => page.concat([])));

    useEffect(() => {
        //TODO - get rid of this and flatten only on save as we shouldnt need to have it till then and shouldnt need to have so much state to keep insync
        //flatten the ui structure so the data can be saved as nicely
        formFieldsState = (() => {
            return props.formPages.flat().reduce((accumulator, formField) => {

                if (formField.objectType === 'FormField') {
                    return {
                        ...accumulator,
                        [formField.id]: {
                            value: formField.initialValue,
                            isValid: !formField.isRequired
                        }
                    };
                } else {
                    return {
                        ...accumulator,
                        [formField.id]: {
                            value: formField.initialValue,
                        }
                    };

                }
            }, {})
        })();
    }, []);



    const onFormPageCompleted = (): void => {
        const newPagesComplete = pagesComplete.concat([]);
        newPagesComplete[currentIndex] = true;
        setPagesComplete(newPagesComplete);
        if (newPagesComplete.filter((pageCompleted) => pageCompleted).length === props.formPages.length) {
            setAllPagesComplete(true);
        }
    };

    const onValueChanged = (id: string, value: string | number | FormListItemType[], isValid?: boolean): void => {
            const isFieldValid = isValid === undefined ? true : isValid;
            const pageField = formPagesState[currentIndex].find(pageField => pageField.id === id);

            if (pageField && Array.isArray(value)) {
                formFieldsState[id] = {value, isValid: true}; // asssume that the item list is valid as shouldnt be able to add to list if not valid
                pageField.initialValue = value;

            } else {
                if ( pageField && instanceOfFormFieldType(pageField) && (typeof value === 'string' || typeof value === 'number') ) {
                    formFieldsState[id] = {value, isValid: isFieldValid};
                    pageField.initialValue = value;
                }

            }

            const unPopulatedFields = formPagesState[currentIndex]
                .map(({id}) => id)
                .filter((id) => !formFieldsState[id].isValid);

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

    const onChangePage = (index: number): void => {
        setCurrentIndex(index);
    };

    const onFinish = (): void => {
        props.onFormFinished(formFieldsState); // save the form data
    };

    return <div className={"form"}>
        { props.stepHeaderLabels && createStepHeader(props.stepHeaderLabels, currentIndex, onChangePage) }
        <div className={"form_page"}>
            {formPagesState[currentIndex] && <FormPage  formFields={formPagesState[currentIndex]} onValueChanged={onValueChanged} />}
        </div>
        <div className={"form_footer"}>
            {props.formPages.length > 1 && !!currentIndex && <StandardButton id={"previousBtn"} label={'Previous'} onClick={onPreviousPage} />}
            {props.formPages.length > 1 && currentIndex < props.formPages.length -1 ? <StandardButton id={"nextBtn"} label={'Next'} isDisabled={!pagesComplete[currentIndex]} onClick={onNextPage} />  :
                <StandardButton id={"finishBtn"} label={'Finish'} isDisabled={!allPagesComplete} onClick={onFinish} />}
        </div>
    </div>
};

export default StandardForm;