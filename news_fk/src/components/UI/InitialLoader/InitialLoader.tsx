import React from 'react';

const InitialLoader = () => {
    return (
        <div className="text-danger d-flex justify-content-center">
            <div className="spinner-border m-5" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}

export default InitialLoader;
