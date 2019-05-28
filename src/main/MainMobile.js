import React, { Fragment } from 'react';

import SortsSidebar from "../mobile/SortsSidebar";
import RefinementSidebar from "../mobile/RefinementsSidebar";
import InfiniteHits from "../shared/InfiniteHits";
import CustomStats from "../shared/CustomStats"

import config from '../config'

const MainMobile = ({ setSearchStateSortBy, setSearchStatePage, page }) => (
    <Fragment>
        <div className="euip-BottomActions">
            <SortsSidebar
                setSearchStateSortBy={setSearchStateSortBy}
                triggerComponent={<p className="euip-BottomActions-action">Trier</p>}
                title={config.translations.sortTitle} />
            <RefinementSidebar
                title={config.translations.sortTitle}
                triggerComponent={<p className="euip-BottomActions-action">Filtrer</p>} />
        </div>
        <CustomStats page={page} />
        <InfiniteHits showPrevious={true} setSearchStatePage={setSearchStatePage} page={page} />
    </Fragment>
);

export default MainMobile;