//PURPOSE: Load a Spinner When the Page is Loaded For the First Time, Called from Within App.js

//-----------------------------------------------------------------------------------------------------------------
// Importing a named module or parameter to be used in InitialLoader.js

import React from 'react';

//-----------------------------------------------------------------------------------------------------------------
interface InitialLoaderProps{

}

const InitialLoader: React.FC<InitialLoaderProps> = (props) => {
    return (
        /* <h1>INITIAL LOADER</h1> */
        <div className="text-danger d-flex justify-content-center">
            <div className="spinner-border m-5" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    
    );
}

//--------------------------Exporting as Default Initial Loader-----------------------------------------------------

export default InitialLoader;

//------------------------------------------------------------------------------------------------------------------