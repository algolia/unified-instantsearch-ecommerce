import React from 'react';

import CurrentRefinementsTags from './CurrentRefinementsTags';
import CustomInfiniteHits from './CustomInfiniteHits';

const RightColumn = () => (
    <div className="euip-rightColumn">
        <CurrentRefinementsTags />
        <CustomInfiniteHits showPrevious={true} />
    </div>
);

export default RightColumn;