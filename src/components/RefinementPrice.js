import React from 'react';
import RheostatRangeSlider from 'instantsearch-rheostat-range-slider-react';

import { withPanel } from '../hoc/withPanel';

export const RefinementPrice = withPanel((props) => (
  <RheostatRangeSlider {...props} />
));
