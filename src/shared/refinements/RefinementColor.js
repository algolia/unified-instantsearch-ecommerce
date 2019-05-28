import React from 'react';
import ColorRefinementList from 'instantsearch-color-refinement-list-react';

import toggablePanel from './../toggables/ToggablePanel';

const RefinementColor = props => (
    <ColorRefinementList {...props} {...props.extra} />
);

export default toggablePanel(RefinementColor);