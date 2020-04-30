import React from "react";
import NavigationBar from "../navigation-bar/NavigationBar";
import {FamiliesProvider} from "../../state/context/families/FamiliesContext";

type MainLayoutWithSideMenuProps = {
    mainContent?: React.ReactElement;
    leftSideContent?: React.ReactElement;
    rightSideContent?: React.ReactElement;
    headerContent?: React.ReactElement;
    footerContent?: React.ReactElement;
}

const MainLayoutWithSideMenu = (props: MainLayoutWithSideMenuProps): React.ReactElement => {
    return (
        <FamiliesProvider>
            <div className={"main-layout-with-sidebar"}>
                <div className={"main-layout-with-sidebar_header"}>
                    <NavigationBar>
                        {props.headerContent}
                    </NavigationBar>
                </div>
                <div className={"main-layout-with-sidebar_main"}>
                    {props.leftSideContent && <div className={"main-layout-with-sidebar_main_left-side"}>
                        {props.leftSideContent}
                    </div>}
                    {props.mainContent && <div className={"main-layout-with-sidebar_main_center"}>
                        {props.mainContent}
                    </div>}
                    {props.rightSideContent && <div className={"main-layout-with-sidebar_main_right-side"}>
                        {props.rightSideContent}
                    </div>}
                </div>
                <div className={"main-layout-with-sidebar_footer"}>
                    {props.footerContent}
                </div>
            </div>
        </FamiliesProvider>
    );
};

export default MainLayoutWithSideMenu;