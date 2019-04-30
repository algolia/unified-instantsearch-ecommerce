import React from "react";

import toggablePanel from './shared/ToggablePanel';

const PanelCategories = () => (
    <p>Panel Content</p>
);

PanelCategories.header = "Categories";
PanelCategories.attribute = "category"

export default toggablePanel(PanelCategories);