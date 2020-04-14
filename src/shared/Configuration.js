import React from 'react';
import { Configure } from 'react-instantsearch-dom';
import { isMobile } from 'react-device-detect';

import config from './../config.js';

class Configuration extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }

  render() {
    return (
      <Configure
        {...config.instantSearchConfigure}
        ruleContexts={isMobile ? ['mobile'] : []}
      />
    );
  }
}

export default Configuration;
