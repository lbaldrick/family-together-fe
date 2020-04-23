import React from "react";
import NavigationBar from "../navigation-bar/NavigationBar";

type MainLayoutProps = {
    navigationBar?: React.ReactElement;
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

            </div>
            <div className={"main-layout_footer"}>

            </div>
        </div>
    );
};

export default MainLayout;