import React from 'react';

import PanelBrands from './PanelBrands';
import PanelColors from './PanelColors';
import PanelSizes from './PanelSizes';
import PanelPrices from './PanelPrices';

class LeftColumn extends React.Component {

    render() {
        return (
            <div className="euip-leftColumn">
                <PanelBrands />
                <PanelColors />
                <PanelSizes />
                <PanelPrices />
            </div>
        )
    }

}

export default LeftColumn;