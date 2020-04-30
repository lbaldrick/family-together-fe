import React from "react";
import NavigationBar from "../navigation-bar/NavigationBar";

type MainLayoutProps = {
    navigationBar?: React.ReactElement;
    mainComponent?: React.ReactElement;
    footerComponent?: React.ReactElement;
}

const MainLayout = (props: MainLayoutProps): React.ReactElement => {
    return (
        <div className={"main-layout"}>
            <div className={"main-layout_header"}>
                <NavigationBar>
                    {props.navigationBar}
                </NavigationBar>
            </div>
            <div className={"main-layout_main"}>
                {props.mainComponent}
            </div>
            <div className={"main-layout_footer"}>
                {props.footerComponent}
            </div>
        </div>
    );
};

export default MainLayout;