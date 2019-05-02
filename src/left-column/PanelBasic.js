import React from 'react';
import { RefinementList } from 'react-instantsearch-dom';

import toggablePanel from './../shared/ToggablePanel';

const PanelBasic = props => (
    <RefinementList {...props} {...props.extra} />
);

export default toggablePanel(PanelBasic);