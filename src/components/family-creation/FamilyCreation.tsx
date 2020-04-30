import React from "react";
import StandardForm, {FormFieldType, FormListType} from "../common/form/StandardForm";
import ValueInput from "../common/inputs/ValueInput";
import './family-creation.scss';
import {FormList} from "../common/form/FormList";
import Dropdown from "../common/dropdowns/Dropdown";
import {FamilyPositionsEnum} from "../../state/model/Family";
import {FamiliesDispatchContext, FamiliesStateContext, saveFamily} from "../../state/context/families/FamiliesContext";

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
            id: 'primaryParentFirstName',
            component: ValueInput,
            isRequired: true,
            type: "text",
            placeholder: "Enter Your First Name",
            objectType: 'FormField'

        },
        {
            id: 'primaryParentLastName',
            component: ValueInput,
            isRequired: true,
            type: "text",
            placeholder: "Enter Your Last Name",
            objectType: 'FormField',

        },
        {
            id: 'primaryParentDob',
            component: ValueInput,
            isRequired: true,
            type: "date",
            placeholder: "Enter Date of Birth",
            objectType: 'FormField',

        },
        {
            id: 'primaryParentRelationshipToChildren',
            component: Dropdown,
            isRequired: true,
            type: "text",
            placeholder: "Select relationship",
            items: [
                {
                    id: FamilyPositionsEnum.MOTHER,
                    label: "Mother",
                    value: FamilyPositionsEnum.MOTHER,
                },
                {
                    id: FamilyPositionsEnum.FATHER,
                    label: "Father",
                    value: FamilyPositionsEnum.FATHER,
                },
                {
                    id: FamilyPositionsEnum.GRAND_MOTHER,
                    label: "Grand Mother",
                    value: FamilyPositionsEnum.GRAND_MOTHER,
                },
                {
                    id: FamilyPositionsEnum.GRAND_FATHER,
                    label: "Grand Father",
                    value: FamilyPositionsEnum.GRAND_FATHER,
                },
                {
                    id: FamilyPositionsEnum.AUNT,
                    label: "Aunt",
                    value: FamilyPositionsEnum.AUNT,
                },
                {
                    id: FamilyPositionsEnum.UNCLE,
                    label: "Uncle",
                    value: FamilyPositionsEnum.UNCLE,
                }
            ],
            objectType: 'FormField',

        },

    ],
    [
        {
            id: 'children',
            component: FormList,
            header: 'Enter children\'s details:',
            initialValue: [],
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
                    type: "date",
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
            initialValue: [],
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
                    type: "date",
                    placeholder: "Enter Your Date of Birth",
                    objectType: 'FormField',

                },
                {
                    id: 'relationshipToChildren',
                    component: Dropdown,
                    isRequired: true,
                    type: "text",
                    placeholder: "Select relationship",
                    items: [
                        {
                            id: FamilyPositionsEnum.MOTHER,
                            label: "Mother",
                            value: FamilyPositionsEnum.MOTHER,
                        },
                        {
                            id: FamilyPositionsEnum.FATHER,
                            label: "Father",
                            value: FamilyPositionsEnum.FATHER,
                        },
                        {
                            id: FamilyPositionsEnum.GRAND_MOTHER,
                            label: "Grand Mother",
                            value: FamilyPositionsEnum.GRAND_MOTHER,
                        },
                        {
                            id: FamilyPositionsEnum.GRAND_FATHER,
                            label: "Grand Father",
                            value: FamilyPositionsEnum.GRAND_FATHER,
                        },
                        {
                            id: FamilyPositionsEnum.AUNT,
                            label: "Aunt",
                            value: FamilyPositionsEnum.AUNT,
                        },
                        {
                            id: FamilyPositionsEnum.UNCLE,
                            label: "Uncle",
                            value: FamilyPositionsEnum.UNCLE,
                        }
                    ],
                    objectType: 'FormField',

                },
            ],
            objectType: 'FormList',
        }
    ]
];

const FamilyCreationContainer = (): React.ReactElement => {
    return <FamilyCreation/>
};

const FamilyCreation = (): React.ReactElement => {
    const familyDispatchContext = React.useContext(FamiliesDispatchContext);
    return <div className={"family-creation"}>
        <StandardForm onFormFinished={(result: any): void => familyDispatchContext && saveFamily(familyDispatchContext, result)}
                      stepHeaderLabels={['Your Details', 'Children\'s Details', 'Other Family Member\'s Details']}
                      formPages={formPages}
                      currentFormIndex={0} />
    </div>
};

export default FamilyCreationContainer;