import React from 'react';
import GroupSizeRefinementList from 'instantsearch-group-size-refinement-list-react';

import toggablePanel from './../shared/ToggablePanel';

const PanelSizes = () => (
    <GroupSizeRefinementList
        attribute="size"
        patterns={[/^((X?(S|L))|M|XXL|XXXL|[2-5]XL)$/im]}
        showMore={true}
        sortSizesByNbResults={false}
    />
);

PanelSizes.header = "Sizes";
PanelSizes.attribute = "size";

export default toggablePanel(PanelSizes);