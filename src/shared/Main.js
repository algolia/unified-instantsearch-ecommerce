import React from 'react';
import { isMobile } from 'react-device-detect';

import LeftColumn from '../left-column/LeftColumn';
import RightColumn from '../right-column/RightColumn';
import RefinementSidebar from '../mobile/RefinementsSidebar';

const Main = ({ changeSearchStatePage }) => {
    if (isMobile) {
        return (
            <React.Fragment>
                <RefinementSidebar triggerComponent={<p className="euip-SidebarPanel-button">Filtrer</p>} />
                <RightColumn changeSearchStatePage={changeSearchStatePage} />
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <LeftColumn />
            <RightColumn changeSearchStatePage={changeSearchStatePage} />
        </React.Fragment>
    )
};

export default Main;