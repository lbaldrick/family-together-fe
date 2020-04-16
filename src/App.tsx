import React from 'react';
import NavBar from "./components/NavBar";
import { useAuth0 } from "./Auth";

 const App = () => {
     // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
     const { loading } = useAuth0();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            <header>
                <NavBar />
            </header>
        </div>
    );
}

export default App;