import React from 'preact/compat';

import { FilterIcon } from './FilterIcon';
import { useSearchContext } from '../hooks';

export function FiltersButton({ onClick }) {
  const { refinementCount } = useSearchContext();

  return (
    <button
      data-layout="mobile"
      onClick={onClick}
      className="uni-FiltersButton"
    >
      <FilterIcon />
      Filters
      {refinementCount > 0 && (
        <span className="uni-FiltersButton-Count">{refinementCount}</span>
      )}
    </button>
  );
}
