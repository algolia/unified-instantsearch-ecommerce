import React from 'react';

import PanelBasic from './PanelBasic';
import PanelColor from './PanelColor';
import PanelSize from './PanelSize';
import PanelPrice from './PanelPrice';

import config from './../config.js';

const PANELS = {
    basic: PanelBasic,
    color: PanelColor,
    size: PanelSize,
    price: PanelPrice
};

const LeftColumn = props => {
    const refinements = config.refinements;

    return (
        <div className="euip-leftColumn">
            {refinements.map((refinement, idx) => (
                React.createElement(PANELS[refinement.type], { key: idx, ...refinement, ...props })
            ))}
        </div>
    )
};

export default LeftColumn;