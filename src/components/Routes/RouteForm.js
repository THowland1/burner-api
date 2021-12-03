import React, { useState } from 'react';

export default function RouteForm({ routeAdded }) {
    const [name, setName] = useState('');
    const [raw, setRaw] = useState('');

    const resetForm = () => {
        setName('');
        setRaw('');
    };

    const submitRoute = async (e) => {
        e.preventDefault();
        try {
            await fetch('/api/routes', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    raw,
                }),
            });
            resetForm();
            routeAdded();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="card">
            <div className="card-header">Add a New Route</div>
            <div className="card-body">
                <form className="" onSubmit={submitRoute}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="link">Raw</label>
                        <textarea
                            type="text"
                            name="Raw"
                            value={raw}
                            className="form-control"
                            onChange={(e) => setRaw(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
