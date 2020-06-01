import React from 'react';
const InitialLoader = (props) => {
    return (
        /* <h1>INITIAL LOADER</h1> */
        <div className="text-danger d-flex justify-content-center">
            <div className="spinner-border m-5" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    
    );
}
export default InitialLoader;