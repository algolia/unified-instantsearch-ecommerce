import React from 'react';

import { RefinementList } from 'react-instantsearch-dom';

import toggablePanel from './ToggablePanel';

const PanelBrands = () => (
    <RefinementList attribute="brand" searchable />
);

PanelBrands.header = "Brands";

export default toggablePanel(PanelBrands);