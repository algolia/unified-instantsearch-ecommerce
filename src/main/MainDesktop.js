import React from 'react';

import { Refinements } from '../shared/refinements/Refinements';
import { CurrentRefinementsTags } from './../shared/CurrentRefinementsTags';
import { InfiniteHits } from './../shared/InfiniteHits';
import { SearchBar } from './../shared/SearchBar';
import { Banner } from './../shared/Banner';
import { CustomStats } from '../shared/CustomStats';

export const MainDesktop = ({ page, onClose }) => (
  <React.Fragment>
    <div className="euip-leftColumn">
      <Refinements />
    </div>

    <div className="euip-rightColumn">
      <SearchBar onClose={onClose} />
      <Banner />
      <CurrentRefinementsTags />
      <CustomStats page={page} />
      <InfiniteHits />
    </div>
  </React.Fragment>
);
