import React from 'react';
import { RefinementList } from 'react-instantsearch-dom';

import { Panel } from './Panel';

export const RefinementBasic = (props) => (
  <Panel {...props}>
    <RefinementList {...props} {...props.extra} />
  </Panel>
);
