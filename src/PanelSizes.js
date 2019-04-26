import React from 'react';
import GroupSizeRefinementList from 'instantsearch-group-size-refinement-list-react';

import toggablePanel from './ToggablePanel';

const PanelSizes = () => (
    <GroupSizeRefinementList
        attribute="size"
        patterns={[/^((X?(S|L))|M|XXL|XXXL|[2-5]XL)$/im]}
        showMore={true}
    />
);

PanelSizes.header = "Sizes";

export default toggablePanel(PanelSizes);