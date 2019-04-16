import React from 'react';

import toggablePanel from './ToggablePanel';

const PanelPrices = () => (
    <p>Panel Content</p>
);

PanelPrices.header = "Price";

export default toggablePanel(PanelPrices);