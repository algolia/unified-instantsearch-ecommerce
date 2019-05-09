import React from 'react';

import ColumnContainer from '../containers/ColumnContainer'

import PanelBrands from './PanelBrands';
import PanelColors from './PanelColors';
import PanelSizes from './PanelSizes';
import PanelPrices from './PanelPrices';

const LeftColumn = () => (
    <div className="euip-leftColumn">
        <PanelBrands />
        <PanelColors />
        <PanelSizes />
        <PanelPrices />
    </div>
)

export default () => <ColumnContainer><LeftColumn /></ColumnContainer>;