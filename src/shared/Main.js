import React from 'react';
import { isMobile } from 'react-device-detect';
import { SortBy } from "react-instantsearch-dom";

import LeftColumn from '../left-column/LeftColumn';
import RightColumn from '../right-column/RightColumn';
import RefinementSidebar from '../mobile/RefinementsSidebar';

import config from './../config';

const Main = ({ setSearchStatePage, page }) => {
    if (isMobile) {
        return (
            <React.Fragment>
                {Array.isArray(config.sorts) && config.sorts.length > 1 &&
                    <SortBy
                        defaultRefinement={config.sorts.filter(sort => sort.default === true)[0].indexName}
                        items={config.sorts.map(sort => ({ value: sort.indexName, label: sort.label }))}
                    />
                }

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