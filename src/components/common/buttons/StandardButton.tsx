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

    return <div className={`standard-button`}>
        <button className={`standard-button_btn ${isSecondary ? 'standard-button_btn--secondary' : 'standard-button_btn--primary'}`} onClick={(event): void => {
            console.log('btn clicked', id);
            event.stopPropagation();
            event.preventDefault();
            onClick(id)
        }} disabled={isDisabled}>
            {label}
        </button>
    </div>
};

export default StandardButton;