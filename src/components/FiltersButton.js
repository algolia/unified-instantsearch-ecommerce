import React from 'react';

import { FilterIcon } from './FilterIcon';

export function FiltersButton({ onClick }) {
  return (
    <button onClick={onClick} className="uni-FiltersButton">
      <FilterIcon />
      Filters
    </button>
  );
}
