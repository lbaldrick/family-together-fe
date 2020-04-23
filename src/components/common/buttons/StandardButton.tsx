import React from "react";

export interface StandardButtonProps {
    id: string;
    label: string;
    onClick: (id: string) => void;
    isSecondary?: boolean;
}


const StandardButton = ({id, label, onClick, isSecondary= false}: StandardButtonProps) => {

    return <div className={`standard-button ${isSecondary} ? 'secondary' : 'primary'`}>
        <button className={"standard-button_btn"} onClick={(): void => onClick(id)}>
            {label}
        </button>
    </div>
};

export default StandardButton;