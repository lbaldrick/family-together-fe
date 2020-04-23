import React from "react";
import LoginButton from "../common/buttons/LoginButton";
import  './navigation-bar.scss';

type NavigationBarProps = {
    children?: React.ReactElement;
}

const NavigationBar = (props: NavigationBarProps): React.ReactElement => {
    return (
        <div className={'navigation-bar'}>
            <div className={'navigation-bar_content'}>
                {props.children}
            </div>
            <LoginButton/>
        </div>
    );
};

export default NavigationBar;