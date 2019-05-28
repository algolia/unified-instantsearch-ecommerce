import React, { Fragment } from 'react';

// import SortBy from "../mobile/SortBy";
// import RefinementSidebar from "../mobile/RefinementsSidebar";
// import CurrentRefinementsTags from "../shared/CurrentRefinementsTags";
import InfiniteHits from "../shared/InfiniteHits";

// import config from "../config";

const MainMobile = ({ setSearchStateSortBy, setSearchStatePage, page }) => (
    <Fragment>
        <div className="euip-BottomActions">
            <p className="euip-BottomActions-action">Trier</p>
            <p className="euip-BottomActions-action">Filtrer</p>
        </div>
        <InfiniteHits showPrevious={true} setSearchStatePage={setSearchStatePage} page={page} />
    </Fragment>
);

export default MainMobile;