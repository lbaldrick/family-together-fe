import React from "react";
import TileButton from "../common/buttons/TileButton";
import history from "../../utils/history";
import "./family-setup.scss";


const FAMILY_CREATION = "FAMILY_CREATION";
const FAMILY_CREATION_BTN_LBL = "CREATE FAMILY";

const FamilySetup = (): React.ReactElement => {

    const onFamilyCreation = (id: string): void => {
        history.push('/create-family');
    };

    return <div className={"family-setup"}>
        <TileButton id={FAMILY_CREATION} label={FAMILY_CREATION_BTN_LBL} onClick={onFamilyCreation}/>
    </div>
};

export default FamilySetup;