import React from "react";
import StandardForm from "../common/form/StandardForm";
import ValueInput from "../common/inputs/ValueInput";

const formPages = [
    [
        {
            id: 'familyName',
            component: ValueInput,
            isRequired: true,
            initialValue: "Smiths",
            type: "text",
            label: "Family Name:"
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