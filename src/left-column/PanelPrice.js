import React from 'react';
import RheostatRangeSlider from 'instantsearch-rheostat-range-slider-react';

import toggablePanel from './../shared/ToggablePanel';

const PanelPrice = props => (
    <RheostatRangeSlider {...props} />
);

export default toggablePanel(PanelPrice);