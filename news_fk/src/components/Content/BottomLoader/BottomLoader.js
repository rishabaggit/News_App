import React from 'react';
import { BallBeat } from 'react-pure-loaders';
import './BottomLoader.css'
const BottomLoader = (props) => {
    return (
        <div className = 'center'>
          <BallBeat
            color={'#123abc'}
            loading={props.load}
          />
        </div>
    );
}

export default BottomLoader;