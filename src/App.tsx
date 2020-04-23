import React from 'react';
import { useAuth0 } from "./Auth";
import NavigationBar from "./components/navigation-bar/NavigationBar";
import Routes from "./Routes";

 const App = () => {
     // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
     const { loading } = useAuth0();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
           <Routes />
        </div>
    );
}

export default App;