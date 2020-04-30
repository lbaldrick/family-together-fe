import React from 'react';
import { useAuth0 } from "./Auth";
import Routes from "./Routes";

 const App = () => {
     // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
     const { loading } = useAuth0();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App" style={ {position: 'absolute', bottom: 0, top: 0, left: 0, right: 0, overflow: 'hidden',   fontSize: '16px', fontFamily: 'Candara, sans-serif'}}>
            <Routes />
        </div>
    );
}

export default App;