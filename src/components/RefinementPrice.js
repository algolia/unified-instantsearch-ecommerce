import React from 'react';

import { Panel } from './Panel';
import { Slider } from './Slider';

export const RefinementPrice = ({ header, ...props }) => (
  <Panel header={header}>
    <Slider {...props.options} />
  </Panel>
);
