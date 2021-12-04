import React, { useEffect, useState } from 'react';
import './App.css';
import RouteForm from './components/Routes/RouteForm';
import RouteList from './components/Routes';

function App() {
    const [routes, setRoutes] = useState([]);


    const loadRoutes = async () => {
        try {
            const res = await fetch('/api/routes');
            const routes = await res.json();
            setRoutes(routes);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadRoutes();
    }, []);
    return (
        <>

            <div className="container mt-5">
                <h1 className="mb-5 text-center">Route Tracker</h1>
                <RouteForm routeAdded={loadRoutes} />
                <RouteList routes={routes} refreshRoutes={loadRoutes} />
            </div>
        </>
    );
}

export default App;
