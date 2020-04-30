import React, {useEffect} from 'react';
import history from './utils/history';

import {
    Router,
    Switch,
    Route,
    useHistory,
    useLocation
} from "react-router-dom";

import NavigationBar from "./components/navigation-bar/NavigationBar";
import {useAuth0} from "./Auth";
import MainLayout from "./components/layouts/MainLayout";
import MainLayoutWithSideMenu from "./components/layouts/MainLayoutWithSideMenu";
import FamilySetup from "./components/family-setup/FamilySetup";
import FamilyCreationContainer from "./components/family-creation/FamilyCreation";

const getPublic = () => {
    return <div>Public</div>
};

const Routes = () => {

    return  (
        <Router history={history}>
            <Switch>
                <Route exact path="/"  component={() => <MainLayout mainComponent={<FamilyCreationContainer/>}/>}/>
                <PrivateRoute path="/authorized" component={() => <MainLayout mainComponent={<FamilyCreationContainer/>}/>}/>
                <PrivateRoute path="/home" component={() => <FamilyCreationContainer/>}/>
                <PrivateRoute path="/create-family" component={() => <MainLayout mainComponent={<FamilyCreationContainer/>}/>}/>
                <PrivateRoute path="/messages" component={getPublic}/>
            </Switch>
        </Router>
    );
};

// eslint-disable-next-line react/prop-types,@typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line react/prop-types
const PrivateRoute =({ component: Component, path, ...rest }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

    useEffect(() => {
        if (loading || isAuthenticated) {
            return;
        }
        const fn = async () => {
            await loginWithRedirect({
                appState: {targetUrl: window.location.pathname}
            });
        };
        fn();
    }, [loading, isAuthenticated, loginWithRedirect, path]);

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const render = props =>
        isAuthenticated === true ? <Component {...props} /> : null;

    return <Route path={path} render={render} {...rest} />;
};

export default Routes;
