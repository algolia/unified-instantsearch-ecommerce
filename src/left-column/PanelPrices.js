import React from 'react';
import RheostatRangeSlider from 'instantsearch-rheostat-range-slider-react';

import toggablePanel from './../shared/ToggablePanel';

const PanelPrices = () => (
    <RheostatRangeSlider attribute="price" />
);

PanelPrices.header = "Price";
PanelPrices.attribute = "price"

export default toggablePanel(PanelPrices);