import React, {Dispatch, SetStateAction, useState, MouseEvent} from "react";

type DrawerProps = {
    drawerContents?: React.ReactElement;
}

const onToggleOpenClosed = (isClosed: boolean, setIsClosed: Dispatch<SetStateAction<boolean>>): (event: MouseEvent) => void => (event: MouseEvent) => {
    event.preventDefault();
    setIsClosed(!isClosed);
};


const Drawer = (props: DrawerProps): React.ReactElement => {
    const [isClosed, setIsClosed] = useState(false);

    return (
        <div className={`drawer ${isClosed ? "--close" : ""}`}>
            <div className={"drawer_header"}>
                <button onClick={onToggleOpenClosed(isClosed, setIsClosed)}>Open/Close</button>
            </div>
            <div className={"drawer_main"}>
                {props.drawerContents}
            </div>
        </div>
    );
};

export default Drawer;