import React from 'react';
import RheostatRangeSlider from 'instantsearch-rheostat-range-slider-react';

import toggablePanel from './../toggables/ToggablePanel';

const RefinementPrice = props => (
    <RheostatRangeSlider {...props} />
);

export default toggablePanel(RefinementPrice);