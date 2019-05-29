import React, { Fragment } from 'react';

import SortsSidebar from "../mobile/SortsSidebar";
import RefinementSidebar from "../mobile/RefinementsSidebar";
import InfiniteHits from "../shared/InfiniteHits";

const MainMobile = ({ setSearchStateSortBy, setSearchStatePage, page }) => (
    <Fragment>
        <div className="euip-BottomActions">
            <SortsSidebar
                setSearchStateSortBy={setSearchStateSortBy}
                triggerComponent={<p className="euip-BottomActions-action">Trier</p>} />
            <RefinementSidebar triggerComponent={<p className="euip-BottomActions-action">Filtrer</p>} />
        </div>

        <InfiniteHits showPrevious={true} setSearchStatePage={setSearchStatePage} page={page} />
    </Fragment>
);

export default MainMobile;