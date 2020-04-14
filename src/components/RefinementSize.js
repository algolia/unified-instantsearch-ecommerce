import React from 'react';
import GroupSizeRefinementList from 'instantsearch-group-size-refinement-list-react';

import { withPanel } from '../hoc/withPanel';

export const RefinementSize = withPanel((props) => (
  <GroupSizeRefinementList
    {...props}
    {...props.extra}
    patterns={props.extra.patterns.map((pattern) => new RegExp(pattern))}
  />
));
