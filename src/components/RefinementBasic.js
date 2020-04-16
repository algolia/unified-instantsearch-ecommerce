import React from 'react';
import { RefinementList } from 'react-instantsearch-dom';

import { Panel } from './Panel';

export const RefinementBasic = ({ header, ...props }) => (
  <Panel header={header}>
    <RefinementList {...props.options} />
  </Panel>
);
