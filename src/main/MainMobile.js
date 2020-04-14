import React, { Fragment } from 'react';

import { SortsSidebar } from '../mobile/SortsSidebar';
import { RefinementsSidebar } from '../mobile/RefinementsSidebar';
import { InfiniteHits } from '../shared/InfiniteHits';
import { CustomStats } from '../shared/CustomStats';
import { SearchBar } from '../shared/SearchBar';
import { Banner } from '../shared/Banner';

import config from '../config';

export const MainMobile = ({ setSearchStateSortBy, page, onClose }) => (
  <Fragment>
    <div className="euip-BottomActions">
      <SortsSidebar
        setSearchStateSortBy={setSearchStateSortBy}
        triggerComponent={<p className="euip-BottomActions-action">Trier</p>}
        title={config.translations.sortTitle}
      />
      <RefinementsSidebar
        title={config.translations.refinementTitle}
        triggerComponent={<p className="euip-BottomActions-action">Filtrer</p>}
      />
    </div>

    <SearchBar onClose={onClose} />
    <Banner />
    <CustomStats page={page} />
    <InfiniteHits />
  </Fragment>
);
