import React from 'react';
import ColorRefinementList from 'instantsearch-color-refinement-list-react';

import toggablePanel from './ToggablePanel';

const PanelColors = () => (
    <ColorRefinementList
        attribute="color"
    />
);

PanelColors.header = "Colors";

export default toggablePanel(PanelColors);