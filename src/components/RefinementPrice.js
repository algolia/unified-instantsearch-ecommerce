import React from 'react';
import RheostatRangeSlider from 'instantsearch-rheostat-range-slider-react';

import { Panel } from './Panel';

export const RefinementPrice = (props) => (
  <Panel {...props}>
    <RheostatRangeSlider {...props} />
  </Panel>
);
