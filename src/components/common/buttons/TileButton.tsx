import React from "react";
import "./buttons.scss";

export interface StandardButtonProps {
    id: string;
    label: string;
    onClick: (id: string) => void;
}


const TileButton = ({id, label, onClick}: StandardButtonProps) => {

    return <div className={`tile-button`} onClick={(): void => onClick(id)}>
        <div className={"tile-button_lbl"} >{label}</div>
    </div>
};

export default TileButton;