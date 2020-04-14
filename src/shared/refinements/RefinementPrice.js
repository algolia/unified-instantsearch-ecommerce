import React from 'react';
import RheostatRangeSlider from 'instantsearch-rheostat-range-slider-react';

import { toggablePanel } from './../toggables/ToggablePanel';

export const RefinementPrice = toggablePanel((props) => (
  <RheostatRangeSlider {...props} />
));
