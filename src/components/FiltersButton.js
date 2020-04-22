import React from 'react';

import { FilterIcon } from './FilterIcon';

export function FiltersButton() {
  return (
    <button className="uni-FiltersButton">
      <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 14">
        <FilterIcon />
      </svg>
      Filters
    </button>
  );
}
