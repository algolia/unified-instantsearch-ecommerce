import React from 'react';
import { isMobile } from 'react-device-detect';

import LeftColumn from '../left-column/LeftColumn';
import RightColumn from '../right-column/RightColumn';
import RefinementSidebar from '../mobile/RefinementsSidebar';

const Main = ({ setSearchStatePage, page }) => {
    if (isMobile) {
        return (
            <React.Fragment>
                <RefinementSidebar triggerComponent={<p className="euip-SidebarPanel-button">Filtrer</p>} />
                <RightColumn setSearchStatePage={setSearchStatePage} />
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <LeftColumn />
            <RightColumn setSearchStatePage={setSearchStatePage} page={page} />
        </React.Fragment>
    )
};

export default Main;