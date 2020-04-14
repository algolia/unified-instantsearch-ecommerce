import React from 'react';
import ColorRefinementList from 'instantsearch-color-refinement-list-react';

import { toggablePanel } from './../toggables/ToggablePanel';

export const RefinementColor = toggablePanel((props) => (
  <ColorRefinementList {...props} {...props.extra} />
));
