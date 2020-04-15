import React from 'react';
import GroupSizeRefinementList from 'instantsearch-group-size-refinement-list-react';

import { Panel } from './Panel';

export const RefinementSize = (props) => (
  <Panel {...props}>
    <GroupSizeRefinementList
      {...props}
      {...props.extra}
      patterns={props.extra.patterns.map((pattern) => new RegExp(pattern))}
    />
  </Panel>
);
