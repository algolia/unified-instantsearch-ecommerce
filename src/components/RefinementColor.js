import React from 'react';
// import ColorRefinementList from 'instantsearch-color-refinement-list-react';

import { Panel } from './Panel';
import { ColorList } from './ColorList';

export const RefinementColor = (props) => (
  <Panel {...props}>
    {/* <ColorRefinementList {...props} {...props.extra} /> */}
    <ColorList {...props} {...props.extra} />
  </Panel>
);
