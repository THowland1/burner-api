import React from 'react';
import Route from './Route';

export default function RouteList({ routes, refreshRoutes }) {
    return (
        <div>
            <h2 className="mt-5 mb-3">Routes</h2>
            <div className="list-group">
                {routes
                    .map((route) => (
                        <Route
                            route={route}
                            key={route.id}
                            refreshRoutes={refreshRoutes}
                        />
                    ))}
            </div>
        </div>
    );
}
