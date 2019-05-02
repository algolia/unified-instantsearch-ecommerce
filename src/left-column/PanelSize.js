import React from 'react';
import GroupSizeRefinementList from 'instantsearch-group-size-refinement-list-react';

import toggablePanel from './../shared/ToggablePanel';

const PanelSize = props => (
    <GroupSizeRefinementList {...props}
                             {...props.extra}
                             patterns={props.extra.patterns.map(pattern => (new RegExp(pattern)))}
    />
);

export default toggablePanel(PanelSize);