import React from 'react';
import ColorRefinementList from 'instantsearch-color-refinement-list-react';

import toggablePanel from './../shared/ToggablePanel';

const PanelColor = props => (
    <ColorRefinementList {...props} />
);

export default toggablePanel(PanelColor);