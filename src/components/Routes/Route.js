import React from 'react';

export default function Route({ route, refreshRoutes }) {

    const deleteRoute = async () => {
        try {
            await fetch('/api/routes', {
                method: 'DELETE',
                body: JSON.stringify({ id: route.id }),
            });
            refreshRoutes();
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="list-group-item">
            <a href={route.link}>
                <h4 className="list-group-item-heading">{route.name}</h4>
            </a>
            <pre><code>
                {route.raw}
            </code></pre>
            <button
                className="btn btn-sm btn-danger ml-2"
                onClick={deleteRoute}
            >
                Delete
            </button>
        </div>
    );
}
