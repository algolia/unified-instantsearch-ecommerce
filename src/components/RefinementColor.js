import React from 'react';
import ColorRefinementList from 'instantsearch-color-refinement-list-react';

import { withPanel } from '../hoc/withPanel';

export const RefinementColor = withPanel((props) => (
  <ColorRefinementList {...props} {...props.extra} />
));
