import React from 'react';

import { Panel } from './Panel';
import { ColorList } from './ColorList';

export const RefinementColor = ({ header, ...props }) => (
  <Panel header={header}>
    <ColorList {...props.options} />
  </Panel>
);
