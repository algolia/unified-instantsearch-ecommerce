import React from 'react';

import toggablePanel from './shared/ToggablePanel';

const PanelColors = () => (
    <p>Panel Content</p>
);

PanelColors.header = "Colors";

export default toggablePanel(PanelColors);