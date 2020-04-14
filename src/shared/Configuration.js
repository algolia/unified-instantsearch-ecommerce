import React from 'react';
import { Configure } from 'react-instantsearch-dom';
import { isMobile } from 'react-device-detect';

import config from './../config.js';

export const Configuration = () => {
  return (
    <Configure
      {...config.instantSearchConfigure}
      ruleContexts={isMobile ? ['mobile'] : []}
    />
  );
};
