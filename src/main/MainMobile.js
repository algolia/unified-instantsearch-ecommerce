import React from 'react';

import SortBy from "../mobile/SortBy";
import RefinementSidebar from "../mobile/RefinementsSidebar";
import CurrentRefinementsTags from "../shared/CurrentRefinementsTags";
import InfiniteHits from "../shared/InfiniteHits";

import config from "../config";

const MainMobile = ({ setSearchStateSortBy, setSearchStatePage, page }) => (
    <React.Fragment>
        {Array.isArray(config.sorts) && config.sorts.length > 1 &&
            <SortBy
                setSearchStateSortBy={setSearchStateSortBy}
                defaultRefinement={config.sorts.filter(sort => sort.default === true)[0].indexName}
                items={config.sorts.map(sort => ({ value: sort.indexName, label: sort.label }))}
            />
        }
        <RefinementSidebar triggerComponent={<p className="euip-SidebarPanel-button">Filtrer</p>} />
        <CurrentRefinementsTags />
        <InfiniteHits showPrevious={true} setSearchStatePage={setSearchStatePage} page={page} />
    </React.Fragment>
);

export default MainMobile;