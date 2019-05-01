import React from 'react';

import { RefinementList } from 'react-instantsearch-dom';

import toggablePanel from './../shared/ToggablePanel';

const PanelBrands = () => (
    <RefinementList attribute="brand" searchable />
);

PanelBrands.header = "Brands";
PanelBrands.attribute = "brand";

export default toggablePanel(PanelBrands);