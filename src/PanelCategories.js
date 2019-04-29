import React from "react";

import toggablePanel from './shared/ToggablePanel';

const PanelCategories = () => (
    <p>Panel Content</p>
);

PanelCategories.header = "Categories";

export default toggablePanel(PanelCategories);