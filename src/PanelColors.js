import React from 'react';
import ColorRefinementList from 'instantsearch-color-refinement-list-react';

import toggablePanel from './shared/ToggablePanel';

const PanelColors = () => (
    <ColorRefinementList
        attribute="color"
    />
);

PanelColors.header = "Colors";
PanelColors.attribute = "color"

export default toggablePanel(PanelColors);