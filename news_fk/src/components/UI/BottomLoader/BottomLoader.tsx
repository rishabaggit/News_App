// PURPOSE: Responsible for Rendering the Three Balls at the botton of the page, when End of Page is Hit

//-----------------------------------------------------------------------------------------------------------------
// Importing a named module or parameter to be used in BottomLoader.js.
// Component Called From App.js in the present version.

import React from 'react';
import { BallBeat } from 'react-pure-loaders';
import './BottomLoader.css'

//---------------------------------------------------------------------------------------------------------------

interface BottomLoaderProps{
  load: boolean;
}

const BottomLoader: React.FC<BottomLoaderProps> = ({load}) => {
    return (
        <div className = 'center'>
                                                      {/* Ball Beat Loaded only if end_of_article is true and color describes a rgb value assigned to it */}
          <BallBeat
            color={'#123abc'}
            loading={load}
          />
        </div>
    );
}

//---------------------------------------------------------------------------------------------------------------
//Exporting as default BottomLoader

export default BottomLoader;

//---------------------------------------------------------------------------------------------------------------