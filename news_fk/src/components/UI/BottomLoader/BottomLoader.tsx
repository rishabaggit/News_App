import './BottomLoader.css'
import React from 'react';
import { BallBeat } from 'react-pure-loaders';

interface BottomLoaderProps {
  load: boolean;
}

const BottomLoader: React.FC<BottomLoaderProps> = ({ load }) => {
  return (
    <div className='center'>
      <BallBeat
        color={'#123abc'}
        loading={load}
      />
    </div>
  );
}

export default BottomLoader;
