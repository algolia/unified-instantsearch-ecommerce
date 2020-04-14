import React, { Fragment } from 'react';

import SortsSidebar from '../mobile/SortsSidebar';
import RefinementSidebar from '../mobile/RefinementsSidebar';
import InfiniteHits from '../shared/InfiniteHits';
import CustomStats from '../shared/CustomStats';
import SearchBar from '../shared/SearchBar';
import Banner from '../shared/Banner';

import config from '../config';

const MainMobile = ({
  setSearchStateSortBy,
  setSearchStatePage,
  page,
  displayOverlay,
}) => (
  <Fragment>
    <div className="euip-BottomActions">
      <SortsSidebar
        setSearchStateSortBy={setSearchStateSortBy}
        triggerComponent={<p className="euip-BottomActions-action">Trier</p>}
        title={config.translations.sortTitle}
      />
      <RefinementSidebar
        title={config.translations.refinementTitle}
        triggerComponent={<p className="euip-BottomActions-action">Filtrer</p>}
      />
    </div>

    <SearchBar displayOverlay={displayOverlay} />
    <Banner />
    <CustomStats page={page} />
    <InfiniteHits
      showPrevious={true}
      setSearchStatePage={setSearchStatePage}
      page={page}
    />
  </Fragment>
);

export default MainMobile;
