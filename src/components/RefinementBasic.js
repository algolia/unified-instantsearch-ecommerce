import React from 'react';
import { RefinementList } from 'react-instantsearch-dom';

import { withPanel } from '../hoc/withPanel';

export const RefinementBasic = withPanel((props) => (
  <RefinementList {...props} {...props.extra} />
));
