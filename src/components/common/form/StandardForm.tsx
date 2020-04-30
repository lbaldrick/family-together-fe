import React, {useState} from 'react';
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
}

type FormProps = {
    formPages: (FormFieldType | FormListType)[][];
    currentFormIndex: number;
    stepHeaderLabels?: string[];
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

    //copy the formPages as we update this with ui changes but we dont want this on the component state causing unnecessary rerenders
    const formPagesState: (FormFieldType | FormListType)[][]  = props.formPages.map((page) => page.concat([]));

    //TODO - get rid of this and flatten only on save as we shouldnt need to have it till then and shouldnt need to have so much state to keep insync
    //flatten the ui structure so the data can be saved as nicely
    const formFieldsState: FormFieldState = (() => {
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
                const values = formField.formFields.map((field) => {
                   return {
                       value: field.initialValue,
                       isValid: !field.isRequired
                   };
                });

                return {
                    ...accumulator,
                    [formField.id]: {
                        value: values,
                    }
                };

            }
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

    const onValueChanged = (id: string, value: string | number | FormListItemType[], isValid?: boolean): void => {
            const isFieldValid = isValid === undefined ? true : isValid;
            formFieldsState[id] = {value, isValid: isFieldValid};
            const pageField = formPagesState[currentIndex].find(pageField => pageField.id === id);

            if (Array.isArray(pageField)) {

                for (let x = 0; x < pageField.length; x++) {
                    if (pageField[x].id === id) {
                        pageField[x].initialValue = value;
                        break;
                    }
                }
            } else {
                if ( pageField && instanceOfFormFieldType(pageField) && (typeof value === 'string' || typeof value === 'number') ) {
                    pageField.initialValue = value;
                }

            }

            const unPopulatedFields = Object.values(formFieldsState).filter(({isValid}) => isValid);

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
            {<FormPage  formFields={formPagesState[currentIndex]} onValueChanged={onValueChanged} />}
        </div>
        <div className={"form_footer"}>
            {props.formPages.length > 1 && !!currentIndex && <StandardButton id={"previousBtn"} label={'Previous'} onClick={onPreviousPage} />}
            {props.formPages.length > 1 && currentIndex < props.formPages.length -1 ? <StandardButton id={"nextBtn"} label={'Next'} isDisabled={pagesComplete[currentIndex]} onClick={onNextPage} />  :
                <StandardButton id={"finishBtn"} label={'Finish'} isDisabled={!allPagesComplete} onClick={onFinish} />}
        </div>
    </div>
};

export default StandardForm;