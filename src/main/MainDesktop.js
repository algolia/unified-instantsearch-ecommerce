import React from 'react';

import Refinements from "../shared/refinements/Refinements";
import CurrentRefinementsTags from "./../shared/CurrentRefinementsTags";
import InfiniteHits from "./../shared/InfiniteHits";

const MainDesktop = ({ setSearchStatePage, page }) => (
    <React.Fragment>
        <div className="euip-leftColumn">
            <Refinements />
        </div>

        <div className="euip-rightColumn">
            <CurrentRefinementsTags />
            <InfiniteHits showPrevious={true} setSearchStatePage={setSearchStatePage} page={page} />
        </div>
    </React.Fragment>
);

export default MainDesktop;