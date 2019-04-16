import React from 'react';

import toggablePanel from './ToggablePanel';

const PanelColors = () => (
    <p>Panel Content</p>
);

PanelColors.header = "Colors";

export default toggablePanel(PanelColors);