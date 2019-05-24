import React from 'react';

import CurrentRefinementsTags from './CurrentRefinementsTags';
import CustomInfiniteHits from './CustomInfiniteHits';

const RightColumn = ({ changeSearchStatePage }) => (
    <div className="euip-rightColumn">
        <CurrentRefinementsTags />
        <CustomInfiniteHits showPrevious={true} changeSearchStatePage={changeSearchStatePage} />
    </div>
);

export default RightColumn;