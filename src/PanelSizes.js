import React from 'react';

import toggablePanel from './ToggablePanel';

const PanelSizes = () => (
    <p>Panel Content</p>
);

PanelSizes.header = "Sizes";

export default toggablePanel(PanelSizes);