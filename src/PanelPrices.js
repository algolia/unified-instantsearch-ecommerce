import React from 'react';

import toggablePanel from './ToggablePanel';
import RangeSlider from './RangeSlider'

const PanelPrices = () => (
    <RangeSlider attribute="price" />
);

PanelPrices.header = "Price";

export default toggablePanel(PanelPrices);