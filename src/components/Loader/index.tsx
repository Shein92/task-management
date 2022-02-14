import React from 'react';
import { LoaderImage, LoaderWrapper } from './style';

import spinner from '../../public/spinner.png';

const Loader = () => {
  return (
    <LoaderWrapper>
      <LoaderImage src={spinner}/>
    </LoaderWrapper>
  );
};

export default Loader;