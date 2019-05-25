import React from 'react';

import CurrentRefinementsTags from './CurrentRefinementsTags';
import CustomInfiniteHits from './CustomInfiniteHits';

const RightColumn = ({ setSearchStatePage, page }) => (
    <div className="euip-rightColumn">
        <CurrentRefinementsTags />
        <CustomInfiniteHits showPrevious={true} setSearchStatePage={setSearchStatePage} page={page} />
    </div>
);

export default RightColumn;