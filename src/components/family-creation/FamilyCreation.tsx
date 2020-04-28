import React from "react";
import StandardForm, {FormFieldType, FormListType} from "../common/form/StandardForm";
import ValueInput from "../common/inputs/ValueInput";
import './family-creation.scss';
import {FormList} from "../common/form/FormList";

const formPages: (FormFieldType | FormListType)[][] = [
    [
        {
            id: 'familyName',
            component: ValueInput,
            isRequired: true,
            type: "text",
            placeholder: "Enter Family Name",
            objectType: 'FormField'

        },
        {
            id: 'children',
            component: FormList,
            header: 'Enter childrens details:',
            formFields: [
                {
                    id: 'childFirstName',
                    component: ValueInput,
                    isRequired: true,
                    type: "text",
                    placeholder: "Enter First Name",
                    objectType: 'FormField'

                },
                {
                    id: 'childLastName',
                    component: ValueInput,
                    isRequired: true,
                    type: "text",
                    placeholder: "Enter Last Name",
                    objectType: 'FormField',

                },
                {
                    id: 'childDob',
                    component: ValueInput,
                    isRequired: true,
                    type: "text",
                    placeholder: "Enter Date of Birth",
                    objectType: 'FormField',

                },
            ],
            objectType: 'FormList',
        }
    ],
    [
        {
            id: 'otherFamilyMembers',
            component: FormList,
            header: 'Enter family members details:',
            formFields: [
                {
                    id: 'firstName',
                    component: ValueInput,
                    isRequired: true,
                    type: "text",
                    placeholder: "Enter First Name",
                    objectType: 'FormField'

                },
                {
                    id: 'lastName',
                    component: ValueInput,
                    isRequired: true,
                    type: "text",
                    placeholder: "Enter Last Name",
                    objectType: 'FormField',

                },
                {
                    id: 'dob',
                    component: ValueInput,
                    isRequired: true,
                    type: "text",
                    placeholder: "Enter Date of Birth",
                    objectType: 'FormField',

                },
                {
                    id: 'relationshipToChildren',
                    component: ValueInput,
                    isRequired: true,
                    type: "text",
                    placeholder: "Enter Relationship",
                    objectType: 'FormField',

                },
            ],
            objectType: 'FormList',
        }
    ]
]

const FamilyCreationContainer = () => {
    return <FamilyCreation/>
};

const FamilyCreation = () => {
    return <div className={"family-creation"}>
        <StandardForm formPages={formPages} currentFormIndex={0} />
    </div>
};

export default FamilyCreationContainer;