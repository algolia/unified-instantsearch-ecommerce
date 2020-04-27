import React from 'react';

import { FilterIcon } from './FilterIcon';

export function FiltersButton({ onClick }) {
  return (
    <button
      data-layout="mobile"
      onClick={onClick}
      className="uni-FiltersButton"
    >
      <FilterIcon />
      Filters
    </button>
  );
}
