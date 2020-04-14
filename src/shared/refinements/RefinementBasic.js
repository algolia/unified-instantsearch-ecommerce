import React from 'react';
import { RefinementList } from 'react-instantsearch-dom';

import toggablePanel from './../toggables/ToggablePanel';

const RefinementBasic = (props) => (
  <RefinementList {...props} {...props.extra} />
);

export default toggablePanel(RefinementBasic);
