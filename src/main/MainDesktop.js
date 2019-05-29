import React from 'react';

import Refinements from "../shared/refinements/Refinements";
import CurrentRefinementsTags from "./../shared/CurrentRefinementsTags";
import InfiniteHits from "./../shared/InfiniteHits";
import SearchBar from './../shared/SearchBar';
import Banner from './../shared/Banner';

const MainDesktop = ({ setSearchStatePage, page, displayOverlay }) => (
    <React.Fragment>
        <div className="euip-leftColumn">
            <Refinements />
        </div>

        <div className="euip-rightColumn">
            <SearchBar displayOverlay={displayOverlay} />
            <Banner />
            <CurrentRefinementsTags />
            <InfiniteHits showPrevious={true} setSearchStatePage={setSearchStatePage} page={page} />
        </div>
    </React.Fragment>
);

export default MainDesktop;