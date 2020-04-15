import React from 'react';

import { Panel } from './Panel';
import { Slider } from './Slider';

export const RefinementPrice = (props) => (
  <Panel {...props}>
    <Slider {...props} />
  </Panel>
);
