import React from 'react';
import RheostatRangeSlider from 'instantsearch-rheostat-range-slider-react';

import toggablePanel from './ToggablePanel';

const PanelPrices = () => (
    <RheostatRangeSlider attribute="price" />
);

PanelPrices.header = "Price";

export default toggablePanel(PanelPrices);