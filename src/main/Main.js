import React from 'react';
import { isMobile } from 'react-device-detect';

import MainMobile from './MainMobile';
import MainDesktop from './MainDesktop';

const Main = (props) => {
  if (isMobile) {
    return <MainMobile {...props} />;
  }

  return <MainDesktop {...props} />;
};

export default Main;
