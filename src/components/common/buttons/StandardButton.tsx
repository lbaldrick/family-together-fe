import React from "react";
import "./buttons.scss";

export interface StandardButtonProps {
    id: string;
    label: string;
    onClick: (id: string) => void;
    isSecondary?: boolean;
    isDisabled?: boolean;
}


const StandardButton = ({ id,
                        label,
                        onClick,
                        isSecondary= false,
                        isDisabled = false}: StandardButtonProps) => {

    return <div className={`standard-button ${isSecondary} ? 'secondary' : 'primary'`}>
        <button className={"standard-button_btn"} onClick={(): void => onClick(id)} disabled={isDisabled}>
            {label}
        </button>
    </div>
};

export default StandardButton;