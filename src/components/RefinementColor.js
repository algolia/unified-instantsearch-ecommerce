import React from 'react';
import ColorRefinementList from 'instantsearch-color-refinement-list-react';

import { Panel } from './Panel';

export const RefinementColor = (props) => (
  <Panel {...props}>
    <ColorRefinementList {...props} {...props.extra} />
  </Panel>
);
